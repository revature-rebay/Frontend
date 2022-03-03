import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CartDTO } from 'src/app/models/cart-dto';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';

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

  constructor(private cartService:CartService, private loginService: LoginService) { }


  ngOnInit(): void {
  }

  deleteProduct(event:MouseEvent) {
    let id = parseInt((<HTMLSpanElement>event.target).id);
    this.cartService.deleteProduct(<CartDTO>{userId:this.loginService.currentUser.id, quantity:0, productId:id});
  }

  updateProduct(event:MouseEvent){
    const cartdto = <CartDTO>({
      userId: this.loginService.currentUser.id,
      quantity: parseInt(this.updateQuantity),
      productId: parseInt((<HTMLSpanElement>event.target).id)
    })
    this.cartService.updateProductQuantity(cartdto)  
  }

}
