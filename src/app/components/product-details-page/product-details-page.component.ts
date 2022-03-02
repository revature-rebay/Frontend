import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.css']
})
export class ProductDetailsPageComponent implements OnInit {

  currentlySelectedProduct:Product = new Product(0, "", "", 0, 0, false, 0);
  //currentlySelectedProduct:ProductModel = new ProductModel(0, "", "", 0, 0, false, 0, new ArrayBuffer(0));
  productArray:Product[] = [];

  displayProduct!:Product; 
  displayImage!:string;
  salePrice:number = 0;
  saleDifferential:number = 0;

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.testGetAllProducts();
    console.log(this.productArray);
     
    //pull
    
  }

  testGetAllProducts():void {
    this.productService.getAllProducts().subscribe(
      (response:Product[]) => {
        this.productArray = response;
        //let yeet:any;
        for (let yeet of response) console.log("Here's the response: " + yeet.productDescription);
        this.setDisplayProduct();
        console.log(this.displayProduct);
      }
    )
  }

  setDisplayProduct():void { 
    this.displayProduct = this.productService.currentlySelectedProduct; 
    //this.displayProduct = this.productArray[9]; 
    this.displayImage = "assets/images/" + this.displayProduct.productName + ".jpg";
    if (this.displayProduct.discountPercentage > 0) {
      this.salePrice = this.displayProduct.productPrice * (1 - this.displayProduct.discountPercentage);
      this.saleDifferential = this.displayProduct.productPrice - this.salePrice;
    }
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
