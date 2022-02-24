import { Component, OnInit } from '@angular/core';
import { CartDTO } from 'src/app/models/cart-dto';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/services/cart.service';



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


  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    //TODO Change form hardcoded UserId
    this.getCart('1');
  }

  getCart(userId: string): void {
    this.cartService.getCart(userId).subscribe((res) => {
      this.cart = res;
    });
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
}
