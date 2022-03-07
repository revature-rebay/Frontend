import { Component, DoCheck, OnInit, ViewEncapsulation } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { CartDTO } from 'src/app/models/cart-dto';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-cart-detail-page',
  templateUrl: './cart-detail-page.component.html',
  styleUrls: ['./cart-detail-page.component.css']
})
export class CartDetailPageComponent implements OnInit {

  //using Behavior subject
  cart !: CartItem[];

  constructor(private routerService:Router, private cartService:CartService, private loginService:LoginService, private navService:NavigationService) {
    this.cartService.monitorCart.subscribe(res => this.cart = res);
   }

  ngOnInit(): void {
    this.getCart(this.loginService.currentUser.id.toString());
  }
  //gets the subtotal inside of the cart
  getSubTotal():number{
    return this.cartService.getSubTotal();
  }
  
  //gets the users cart using the userId
  getCart(userId: string): void {
    this.cartService.getCart(userId).subscribe((res) => {
      if(res) {
        this.cart = res;
      }
    });
  }
  //updates the product quantity inside of the cart 
  //returns the new updated user cart
  update(cartItem:CartDTO){
    cartItem.userId = this.loginService.currentUser.id,
    this.cartService.updateProductQuantity(cartItem).subscribe(res => {
      if(res){
        this.cart = res;
      }
    })
  }

}
