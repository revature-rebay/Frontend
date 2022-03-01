import { Component, OnInit } from '@angular/core';
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
  cart!: CartItem[];
  userId: string = '1';
  userQuantityInput: string = '';
  userIdInput: string = '';
  userProductInput: string = '';


  constructor(private cartService: CartService, private loginService:LoginService) {}

  ngOnInit(): void {
    //TODO Change form hardcoded UserId
    this.getCart(this.loginService.currentUser.id.toString())
  }

  getCart(userId: string): void {
    this.cartService.getCart(userId).subscribe((res) => {
      this.cart = res;
    });
    // this.cart = this.cartService.getCart(userId);
  }

  addProductCart(/*possible input*/): void {
    this.cartService.addProductToCart(this.userIdInput,this.userProductInput,this.userQuantityInput).subscribe(
      res => {
        this.cart = res;
      });
    
  } 

  deleteProduct(): void{
    const cartdto = <CartDTO>({
      userId: parseInt(this.userIdInput),
      quantity: parseInt(this.userQuantityInput),
      productId: parseInt(this.userProductInput)
    })
    
      this.cartService.deleteProduct(cartdto).subscribe(
      res => {
        this.cart =res;
      }
    );
  }

  //just temp, can be removed
  tempDel(event:number){
    // this.cart = this.cartService.tempDel(event);
    this.cartService.deleteProduct(<CartDTO>{userId:this.loginService.currentUser.id, quantity:0, productId:event}).subscribe(res => {
      console.log(res); //is not reached, error is thrown, status 400, but table is updated
      this.cart = res;
    });
  }
}
