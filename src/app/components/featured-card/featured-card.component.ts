import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product/product.model';

@Component({
  selector: 'app-featured-card',
  templateUrl: './featured-card.component.html',
  styleUrls: ['./featured-card.component.css']
})
export class FeaturedCardComponent implements OnInit {
  @Input() singleproduct!:ProductModel;
  @Input() onAdd:any;

  constructor() { }

  ngOnInit(): void {
  }

}