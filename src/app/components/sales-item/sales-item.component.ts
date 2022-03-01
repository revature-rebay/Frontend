import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-sales-item',
  templateUrl: './sales-item.component.html',
  styleUrls: ['./sales-item.component.css']
})
export class SalesItemComponent implements OnInit {

  products: ProductModel[] = [];
  
  constructor( private product:ProductService) { 
  }

  ngOnInit(): void {
    this.product.getAllProducts().subscribe((response: ProductModel[])=> this.products = response);
  }

}
