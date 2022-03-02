import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product/product.model';

@Component({
  selector: 'app-featured-card',
  templateUrl: './featured-card.component.html',
  styleUrls: ['./featured-card.component.css']
})
export class FeaturedCardComponent implements OnInit {
  @Input() singleproduct!:Product;
  @Input() onAdd:any;

  constructor() { }

  ngOnInit(): void {
  console.log(this.singleproduct);
  }

  /*
  "
        onAdd({
          productId: singleproduct.productId,
          productPrice: singleproduct.productPrice,
          productImage: singleproduct.productImage,
          productName: singleproduct.productName,
          maxQuantity: singleproduct.currentStock
        })
      "
  */

}