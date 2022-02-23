import { Byte } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.model.html',
  styleUrls: ['./product.model.css']
})
export class ProductModel implements OnInit {

  productId: number;
  productName: string;
  productPrice: number;
  discountPercentage: number;
  featuredProduct: boolean;
  currentStock: number;
  productImage: ArrayBuffer;

  constructor(productId: number, productName: string, productPrice: number, discountPercentage: number, featuredProduct: boolean, currentStock: number, productImage: ArrayBuffer) {
    this.productId = productId;
    this.productName = productName;
    this.productPrice = productPrice;
    this.discountPercentage = discountPercentage;
    this.featuredProduct = featuredProduct;
    this.currentStock = currentStock;
    this.productImage = productImage;
   }

  ngOnInit(): void {
  }

}
