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
  @Input() discountPercentage !: number;
  @Input() featuredProduct !: boolean;
  @Input() currentStock !: number;
  updateQuantity !: string;

  constructor(private cartService:CartService, private loginService: LoginService) { }


  ngOnInit(): void {
  }
  //deletes the product from the cart 
  //using cartDTO and the userId
  deleteProduct(event:MouseEvent) {
    let id = parseInt((<HTMLSpanElement>event.target).id);
    this.cartService.deleteProduct(<CartDTO>{userId:this.loginService.currentUser.id, quantity:0, productId:id});
  }
  //allows the user to update the quantity of an item inside of the cart
  //returns the new updated cart
  //uses the cartDTO and userID
  updateProduct(event:MouseEvent){
    //when user tries to put invalid input like a letter / symbol or no input, automatically set to current itemQuantity and do not make api call
    console.log(this.updateQuantity);
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
  //sets the image of the item inside of the cart
  setImage():string {
    return "assets/images/" + this.productName + ".jpg";
  }
  //gets the price of the items and displays it
  //checks if it is discounted
  getPrice():number {
    if(this.featuredProduct) return (this.productPrice - (this.productPrice * this.discountPercentage));
    return this.productPrice
  }

}
