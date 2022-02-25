import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  selectedProduct:ProductModel = new ProductModel(0, "", "", 0, 0, false, 0, new ArrayBuffer(0));
  quantity:number = 0;
  productImage:string = "";

  //link to cart service when it gets created
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.loadProductImage();
  }

  loadProductImage():void {
    this.productService.getTestImage().subscribe(
      (data:string) => {
        this.productImage = 'data:image/jpg;base64,' + data;

        let img = document.getElementById("product-image") as HTMLImageElement;
        //img.src = this.productImage;
      }
    )
  }


}
