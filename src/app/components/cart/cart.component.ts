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

  userId: string = '1';
  // userQuantityInput: string = '';
  // userIdInput: string = '';
  // userProductInput: string = '';


  constructor(private cartService: CartService, private loginService:LoginService) {
    this.cartService.monitorCart.subscribe(res => this.cart = res);
  }

  ngOnInit(): void {
    this.getCart(this.loginService.currentUser.id.toString());
  }

  getCart(userId: string): void {
    this.cartService.getCart(userId).subscribe((res) => {
      if(res){
        this.cart = res;
      }
    });
  }

  // addProductCart(/*possible input*/): void {
  //   this.cartService.addProductToCart(this.userIdInput,this.userProductInput,this.userQuantityInput).subscribe(
  //     res => {
  //       if(res) this.cart = res;
  //     });
  // }
  
  update(cartItem:CartDTO){
    cartItem.userId = this.loginService.currentUser.id,
    this.cartService.updateProductQuantity(cartItem).subscribe(res => {
      if(res) this.cart = res;
    })
  }
}
