import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product/product.model'
import { ActivatedRoute, Router } from '@angular/router';
import { JsonpClientBackend } from '@angular/common/http';

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

  constructor(private productService:ProductService, private currencyPipe : CurrencyPipe, private router:Router, private activatedRoute:ActivatedRoute) {
    this.product = new Product(0, "", "", 0, 0, false, 0);
   }

  ngOnInit(): void {
    // this.product = this.productService.getAllProducts(); //TODO: change this to getCurrentProduct() Once pulled changes from branch
    

    // First get the product id from the current route.
    const routeParams = this.activatedRoute.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('productId'));

    // Find the product that correspond with the id provided in route.
    this.setDisplayProduct(productIdFromRoute);
  }

  setDisplayProduct(productId:number):void { 
    this.product = this.productService.getLoadedProductById(productId);
    
    this.productName = this.product.productName;
    this.stock = this.product.currentStock;
    this.discount = this.product.discountPercentage * 100;
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
    this.product.currentStock = this.stock;
    this.product.discountPercentage = this.discount / 100;
    this.product.featuredProduct = this.featured;
    this.product.productDescription = this.productDescription;
    this.product.productPrice = this.formattedAmount;

    //drop the dollar sign from the front of the price string
    this.product.productPrice = parseInt(this.product.productPrice.toString().substring(1));

    console.log("before sending to the db: " + JSON.stringify(this.product));


  //  this.product.productPrice = Number(this.product.productPrice);
  //  console.log(this.product.productPrice);

    this.productService.updateProduct(this.product).subscribe({
      next:(product:boolean)=>{

        //If the product exists then we get a 200 response and update the current product in the productService
        if (product == true) {
          //this means the update worked in the DB
          this.productService.updateAllProducts(); //the current product is now logged in and we store its details for potential later use
          console.log("after sedngin to the db: " + JSON.stringify(this.product));
          //this.productService
        }
        else {
          //the update failed for somereason
        }

        
        
        //redirect to the main page
        this.router.navigateByUrl("");
      },
      error:()=>{
        console.log("Something went wrong when attempting to update this product.")
      }
    });
  }

  
}
