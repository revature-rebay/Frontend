import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;

  constructor(
    private cartService: CartService,
    private loginService: LoginService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.checkoutForm = this.fb.group({
      firstName: 'Name here',
      lastName: '',
      phoneNumber: '',
      address: this.fb.group({
        street: '',
        city: '',
        state: '',
        country: '',
        zipcode: '',
      }),
      payment: this.fb.group({
        cardNumber: '',
        month: '',
        year: '',
        securityCode: '',
      })
    });
  }

  onCheckout() {
    console.log(this.checkoutForm);
  }

  checkout(): void {
    this.cartService.checkout(this.loginService.currentUser.id.toString());
  }
}
