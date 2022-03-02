import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product/product.model'

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  product:Product;

  productName: string ="";
  stock!: number;
  discount!: number;
  featured: boolean = false;
  productDescription: string = "";

  formattedAmount:any;
  amount!: number;
  InputValue:any;

  constructor(private productService:ProductService, private currencyPipe : CurrencyPipe, private router:Router) {
    this.product = new Product(0, "", "", 0, 0, false, 0);
   }

  ngOnInit(): void {
    // this.product = this.productService.getAllProducts(); //TODO: change this to getCurrentProduct() Once pulled changes from branch
    this.productName = this.product.productName;
    this.stock = this.product.currentStock;
    this.discount = this.product.discountPercentage;
    this.featured = this.product.featuredProduct;
    this.productDescription = this.product.productDescription;
    this.formattedAmount = this.product.productPrice;
  }

  transformAmount(element:any){
    this.formattedAmount = this.currencyPipe.transform(this.formattedAmount, '$');

    element.target.value = this.formattedAmount;
  }

  setvalue(value:any) {
    this.InputValue = value.replace('%','')+"%"    
  }

  productUpdated():void {

    this.product.productName = this.productName;
    this.product.currentStock = this.discount;
    this.product.discountPercentage = this.discount;
    this.product.featuredProduct = this.featured;
    this.product.productDescription = this.productDescription;
    this.product.productPrice = this.formattedAmount;

    this.productService.updateProduct(this.product).subscribe({
      next:(product:boolean)=>{

        //If the product exists then we get a 200 response and update the current product in the productService
        this.productService.updateProduct(this.product); //the current product is now logged in and we store its details for potential later use
        
        //redirect to the main page
        this.router.navigateByUrl("");
      },
      error:()=>{
        console.log("Something went wrong when attempting to update this product.")
      }
    });
  }

}
