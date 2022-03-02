import { Component, DoCheck, OnInit, ViewEncapsulation } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { CartDTO } from 'src/app/models/cart-dto';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-cart-detail-page',
  templateUrl: './cart-detail-page.component.html',
  styleUrls: ['./cart-detail-page.component.css']
})
export class CartDetailPageComponent implements OnInit, DoCheck {

  cart !: CartItem[];
  size = 0;
  currSize = 0;

  constructor(private cartService:CartService, private loginService:LoginService, private navService:NavigationService) { }

  ngOnInit(): void {
    //this.navService.toggleShowNav();
    // this.cartService.getCart(this.loginService.currentUser.id.toString()).subscribe(res => {
    //   this.cart = res;
    // });
  }

  
  ngDoCheck(): void {
    //TODO
    //can we store cart locally so as to not make multiple api calls
    //can do a check here to see if a cart is stored locally, if so return that else make call
    if(this.cart == undefined) { 
      this.getCart(this.loginService.currentUser.id.toString());
    } 
    else if(this.size != this.currSize) {
      this.getCart(this.loginService.currentUser.id.toString());
    }     
  }

  getCart(userId: string): void {
    this.cartService.getCart(userId).subscribe((res) => {
      if(res) {
        this.cart = res;
        this.size = res.length;
        this.currSize = this.size;
      } else {
        this.cart = new Array();
      }
    });
    // this.cart = this.cartService.getCart(userId);
  }
  
  update(cartItem:CartDTO){
    cartItem.userId = this.loginService.currentUser.id,
    this.cartService.updateProductQuantity(cartItem).subscribe(res => {
      if(res){
        console.log(res)
        this.cart = res;
        this.currSize = res.length;
        if(this.currSize == 0) this.size = 0;
      }
    })
  }

  //just temp, can be removed
  deleteProduct(event:number){
    // this.cart = this.cartService.tempDel(event);
    this.cartService.deleteProduct(<CartDTO>{userId:this.loginService.currentUser.id, quantity:0, productId:event}).subscribe(res => {
      this.cart = res;
      this.currSize = res.length;
      if(this.currSize == 0) this.size = 0;
    });
  }

}
