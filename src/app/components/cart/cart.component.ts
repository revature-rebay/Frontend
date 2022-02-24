import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart!: CartItem[];
  userId: string = '0';

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
}
