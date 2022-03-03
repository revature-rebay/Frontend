import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product/product.model';

@Component({
  selector: 'app-featured-card',
  templateUrl: './featured-card.component.html',
  styleUrls: ['./featured-card.component.css']
})
export class FeaturedCardComponent implements OnInit {
  @Input() singleproduct!:Product;
  @Input() onAdd:any;
  displayName!:string;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  getName(){
    this.displayName = this.singleproduct.productName.replace("_", " ")
  }
}