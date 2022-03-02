import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  currentlySelectedProduct:Product = new Product(0, "", "", 0, 0, false, 0);

  productArray:Product[] = [];

  displayProduct!:Product; 
  displayImage!:string;
  salePrice:number = 0;
  saleDifferential:number = 0;

  // pImage:string =  "assets/images/" + this.displayProduct.productName + ".jpg";

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.getAllProducts();
    console.log(this.getAllProducts());
    
    console.log(this.productArray);
     
    
  }

  getAllProducts():void {
    this.productService.getAllProducts().subscribe(
      (response:Product[]) => {
        this.productArray = response;
        //let yeet:any;
        for (let yeet of response) console.log("Here's the response: " + yeet);
        this.setDisplayProduct();
        console.log(this.displayProduct);
      }
    )
  }

  setDisplayProduct():void { 
    //this.displayProduct = this.productService.currentlySelectedProduct; 
    this.displayProduct = this.productArray[9]; 
    this.displayImage = "assets/images/" + this.displayProduct.productName + ".jpg";
    if (this.displayProduct.discountPercentage > 0) {
      this.salePrice = this.displayProduct.productPrice * (1 - this.displayProduct.discountPercentage);
      this.saleDifferential = this.displayProduct.productPrice - this.salePrice;
    }
  }

  setImage(p: Product):any {
    return "assets/images/" + p.productName + ".jpg";
  }

  onSale():boolean {
    if (this.displayProduct.discountPercentage > 0) return true;
    return false;
  }

  isFeatured():boolean {
    if (this.displayProduct.featuredProduct == true) return true;
    return false;
  }

}