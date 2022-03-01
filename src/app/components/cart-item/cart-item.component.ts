import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CartDTO } from 'src/app/models/cart-dto';
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
  @Output() updateEvent = new EventEmitter<CartDTO>();

  constructor(private cartService:CartService) { }

 

  ngOnInit(): void {
  }

  deleteProduct(event:MouseEvent): void{
    console.log((<HTMLSpanElement>event.target).id);
    this.deleteEvent.emit(parseInt((<HTMLSpanElement>event.target).id));
  }

  updateProduct(event:MouseEvent){
    const cartdto = <CartDTO>({
      userId: 1, //dummy
      quantity: parseInt(this.updateQuantity),
      productId: parseInt((<HTMLSpanElement>event.target).id)
    })
    this.updateEvent.emit(cartdto);
  }

}
