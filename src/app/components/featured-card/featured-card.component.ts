import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product/product.model';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-featured-card',
  templateUrl: './featured-card.component.html',
  styleUrls: ['./featured-card.component.css']
})
export class FeaturedCardComponent implements OnInit {
  @Input() singleproduct!:Product;
  @Input() onAdd:any;
  displayName!:string;

  constructor(private router:Router, private cart:CartService, private login:LoginService) { }

  ngOnInit(): void {
  }

  getDetails(){
    this.router.navigate(['/product_details_page/'+this.singleproduct.productId])
  }
  addCart(){
    this.cart.addProductToCart((String)(this.login.getCurrentUser().id), (String)(this.singleproduct.productId), '1')
  }

  getName(){
    this.displayName = this.singleproduct.productName.replace("_", " ")
  }
}