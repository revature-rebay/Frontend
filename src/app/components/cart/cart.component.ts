import { Component, DoCheck, OnInit } from '@angular/core';
import { CartDTO } from 'src/app/models/cart-dto';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  
  //using Behavoir subject
  cart!: CartItem[];

  //temp - can be removed
  // userId: string = '1';
  // userQuantityInput: string = '';
  // userIdInput: string = '';
  // userProductInput: string = '';

  //subscribes to monitor cart
  //this allows for subtotal, quantity, cart information to stay in sync between all components 
  constructor(private cartService: CartService, private loginService:LoginService) {
    this.cartService.monitorCart.subscribe(res => this.cart = res);
  }

  //uses the login service current user field to get the user's id and so get's their cart 
  ngOnInit(): void {
    this.getCart(this.loginService.currentUser.id.toString());
  }

  //get cart for a user
  getCart(userId: string): void {
    this.cartService.getCart(userId).subscribe((res) => {
      if(res){
        this.cart = res;
      }
    });
  }
  //this method was inject / used in other components 
  // addProductCart(/*possible input*/): void {
  //   this.cartService.addProductToCart(this.userIdInput,this.userProductInput,this.userQuantityInput).subscribe(
  //     res => {
  //       if(res) this.cart = res;
  //     });
  // }
  
  //allows a user to update the quantity of a product in their cart 
  update(cartItem:CartDTO){
    cartItem.userId = this.loginService.currentUser.id,
    this.cartService.updateProductQuantity(cartItem).subscribe(res => {
      if(res) this.cart = res;
    })
  }
}
