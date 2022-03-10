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

  //this component will receive input from parent to set these fields 
  @Input() itemQuantity !: number;
  @Input() productName !: string;
  @Input() productPrice !: number;
  @Input() productDesc !: string;
  @Input() productImage !: ArrayBuffer;
  @Input() productId !: number;
  @Input() currentStock !: number;
  @Input() discountPercentage !: number;
  @Input() featuredProduct !: boolean;
  //ngModel in html template will keep track of the updateQuanity value for a cartItem
  updateQuantity !: string;

  constructor(private cartService:CartService, private loginService:LoginService) { 
  }

  ngOnInit(): void {
  }

  //deletes a products from a user's cart 
  deleteProduct(event:MouseEvent) {
    let id = parseInt((<HTMLSpanElement>event.target).id);
    this.cartService.deleteProduct(<CartDTO>{userId:this.loginService.currentUser.id, quantity:0, productId:id});
  }

  //updates a products quantity in a user's cart
  //if the quantity provided is empty or null, it will by default set it to the current item quantity
  //since the input is type=number, characters are also null, so it will default to current item quantity 
  //else it will send out the request to update the quantity 
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
  //workaround for setting the image of each cart item 
  setImage():string {
    return "assets/images/" + this.productName + ".jpg";
  }
  //returns the price for a product, if featured, it will calculate the discounted price
  getPrice(){
    if(this.discountPercentage) return (this.productPrice - (this.productPrice * this.discountPercentage));
    return this.productPrice
  }
  //uses router to find what url for structural directives in html template
  getPath(){
    return this.cartService.getPath();
  }
}
