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
export class CartComponent implements OnInit, DoCheck {
  cart!: CartItem[];
  size = 0;
  currSize = 0;
  userId: string = '1';
  userQuantityInput: string = '';
  userIdInput: string = '';
  userProductInput: string = '';


  constructor(private cartService: CartService, private loginService:LoginService) {}

  ngOnInit(): void {
    // this.getCart(this.loginService.currentUser.id.toString())
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
      if(res){
        this.cart = res;
        this.size = res.length;
        this.currSize = this.size;
      }
      else {
        this.cart = new Array();
      }
    });
    // this.cart = this.cartService.getCart(userId);
  }

  addProductCart(/*possible input*/): void {
    this.cartService.addProductToCart(this.userIdInput,this.userProductInput,this.userQuantityInput).subscribe(
      res => {
        this.cart = res;
      });
    
  }
  
  update(cartItem:CartDTO){
    cartItem.userId = this.loginService.currentUser.id,
    this.cartService.updateProductQuantity(cartItem).subscribe(res => {
      console.log(res)
      this.cart = res;
      this.currSize = res.length;
      if(this.currSize == 0) this.size = 0;
    })
  }

  // deleteProduct(): void{
  //   const cartdto = <CartDTO>({
  //     userId: parseInt(this.userIdInput),
  //     quantity: parseInt(this.userQuantityInput),
  //     productId: parseInt(this.userProductInput)
  //   })
    
  //     this.cartService.deleteProduct(cartdto).subscribe(
  //     res => {
  //       this.cart =res;
  //     }
  //   );
  // }

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
