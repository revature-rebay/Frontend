import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-featured-item',
  templateUrl: './featured-item.component.html',
  styleUrls: ['./featured-item.component.css']
})
export class FeaturedItemComponent implements OnInit {

  products: Product[] = [];
  
  constructor( private product:ProductService, private router:Router) { 
  }
  getDetails(i:number){
    this.router.navigate(['/product_details_page/'+i])
  }

  ngOnInit(): void {
    this.product.getFeaturedProducts().subscribe((response: Product[])=> this.products = response);
  }

}
