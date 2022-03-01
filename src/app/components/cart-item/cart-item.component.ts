import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input() itemQuantity !: number;
  @Input() productName !: string;
  @Input() productPrice !: number;
  @Input() productDesc !: string;
  @Input() productImage !: ArrayBuffer;
  @Input() productId !: number;
  updateQuantity !: string;

  @Output() deleteEvent = new EventEmitter<number>();
  @Output() updateEvent = new EventEmitter<number>();

  constructor(private cartService:CartService) { }

 

  ngOnInit(): void {
  }

  deleteProduct(event:MouseEvent): void{
    const cartdto = {
      userId: 1,
      quantity: 0,
      productId: (<HTMLSpanElement>event.target).id
    }

    console.log(cartdto.productId);
    this.deleteEvent.emit(parseInt(cartdto.productId));
  }

  // updateProduct(event:InputEvent){

  // }

}
