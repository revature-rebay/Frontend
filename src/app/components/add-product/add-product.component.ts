import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productName:string = "";
  stock!:number;
  featured:boolean = false;
  discount!:number;
  description:string = "";

  formattedPriceAmount:any;
  amount!: number;
  InputValue:any;

  constructor(private currencyPipe : CurrencyPipe, private router:Router, private productService:ProductService) { }

  ngOnInit(): void {
  }

  transformAmount(element:any){
    this.formattedPriceAmount = this.currencyPipe.transform(this.formattedPriceAmount, '$');

    element.target.value = this.formattedPriceAmount;
  }

  setvalue(value:any) {
    this.InputValue = value.replace('%','')+"%"    
  }

  addProduct(): void {
    //make sure no fields are blank, then create a product and send to the backend
    
    if (this.productName == "" || this.formattedPriceAmount == 0 || this.stock == 0 || this.description == "") {
      alert("Must fill out all required fields.");
    }
    else {
      //first create a new product object
      let product:Product = new Product(0, this.productName, this.description, this.formattedPriceAmount, this.discount / 100, this.featured, this.stock);
      product.productPrice = parseInt(product.productPrice.toString().substring(1));
      //create new product here using the usService
      this.productService.addNewProduct(product).subscribe(
        (response:boolean)=>{
            //successfully created a new product, make sure to log it in and then redirect to the main page
            if (response == true){
            this.productService.updateAllProducts();
            alert("New product was created successfully!");
            this.router.navigateByUrl("");
          }else{
            alert("Product was not successfuly added");
          }
        }
      )
    }

  }

}
