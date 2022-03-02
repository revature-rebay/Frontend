import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private cartService: CartService, private loginService: LoginService) { }

  ngOnInit(): void {
  }


  checkout(): void {
    this.cartService.checkout(this.loginService.currentUser.id.toString())
  }

}
