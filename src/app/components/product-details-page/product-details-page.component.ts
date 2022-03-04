import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product/product.model';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.css']
})
export class ProductDetailsPageComponent implements OnInit {

  displayProduct!:Product; 
  displayImage!:string;
  salePrice:number = 0;
  saleDifferential:number = 0;
  quantity:number = 0;

  constructor(private productService:ProductService, private activeRoute:ActivatedRoute, private router:Router, private cartService:CartService, 
    private loginService:LoginService) { }

  ngOnInit() {
    if (this.productService.allProducts.length == 0) {
      //somehow we've gotten to this page before actually loading products.
      //redirect to the main page
      this.router.navigateByUrl("main");
    }
    // First get the product id from the current route.
    const routeParams = this.activeRoute.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('productId'));
  
    // Find the product that correspond with the id provided in route.
    this.setDisplayProduct(productIdFromRoute);
  }

  setDisplayProduct(productId:number):void { 
    this.displayProduct = this.productService.getLoadedProductById(productId);
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

  updateImageURL(){
    this.displayImage = "assets/images/stockImage.jpg";
  }

  addToCart():void {
    alert("Item(s) successfully added to cart:");
    this.cartService.addProductToCart(String(this.loginService.currentUser.id), String(this.displayProduct.productId), String(this.quantity));
  }
}
