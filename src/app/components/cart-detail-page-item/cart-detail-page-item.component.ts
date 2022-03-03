import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CartDTO } from 'src/app/models/cart-dto';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-cart-detail-page-item',
  templateUrl: './cart-detail-page-item.component.html',
  styleUrls: ['./cart-detail-page-item.component.css']
})
export class CartDetailPageItemComponent implements OnInit {

  @Input() itemQuantity !: number;
  @Input() productName !: string;
  @Input() productPrice !: number;
  @Input() productDesc !: string;
  @Input() productImage !: ArrayBuffer;
  @Input() productId !: number;
  @Input() currentStock !: number;
  updateQuantity !: string;

  constructor(private cartService:CartService, private loginService:LoginService) { 
  }

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
