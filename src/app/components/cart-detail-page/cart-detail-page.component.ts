import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-cart-detail-page',
  templateUrl: './cart-detail-page.component.html',
  styleUrls: ['./cart-detail-page.component.css']
})
export class CartDetailPageComponent implements OnInit {

  cart !: CartItem[];

  constructor(private cartService:CartService, private loginService:LoginService, private navService:NavigationService) { }

  ngOnInit(): void {
    //this.navService.toggleShowNav();
    this.cartService.getCart(this.loginService.currentUser.id.toString()).subscribe(res => {
      this.cart = res;
    });
  }

}
