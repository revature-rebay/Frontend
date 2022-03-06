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
  @Input() discountPercentage !: number;
  @Input() featuredProduct !: boolean;
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
    //when user tries to put invalid input like a letter / symbol or no input, automatically set to current itemQuantity and do not make api call
    if(!this.updateQuantity) {
      this.updateQuantity = this.itemQuantity.toString();
    } else {
      const cartdto = <CartDTO>({
        userId: this.loginService.currentUser.id,
        quantity: parseInt(this.updateQuantity),
        productId: parseInt((<HTMLSpanElement>event.target).id)
      })
      this.cartService.updateProductQuantity(cartdto)  
    }
  }
  setImage():string {
    return "assets/images/" + this.productName + ".jpg";
  }

  getPrice(){
    if(this.featuredProduct) return (this.productPrice - (this.productPrice * this.discountPercentage));
    return this.productPrice
  }

  getPath(){
    return this.cartService.getPath();
  }
}
