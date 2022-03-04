import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { States } from 'src/app/models/states';
import { checkoutAnimation } from 'src/app/animations/checkoutAnimations';
import { CartItem } from 'src/app/models/cart-item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  animations: [checkoutAnimation],
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  coupon!: FormGroup;
  togglePayment!: boolean;
  states = States.states;
  cart!: CartItem[];
  pricePercent: number = 1;
  

  constructor(
    private cartService: CartService,
    private loginService: LoginService,
    private fb: FormBuilder,
    private routerService: Router
  ) {
    this.cartService.monitorCart.subscribe((res) => (this.cart = res));
  }

  ngOnInit(): void {
    this.togglePayment = false;
    this.initializeForm();
  }

  initializeForm(): void {
    this.checkoutForm = this.fb.group({
      firstName: this.loginService.currentUser.firstName,
      lastName: this.loginService.currentUser.lastName,
      phoneNumber: '',
      email: this.loginService.currentUser.email,
      address: this.fb.group({
        street: '',
        address2: '',
        city: '',
        state: '',
        country: [
          {
            value: 'United States of America',
            disabled: true,
          },
        ],
        zipcode: '',
      }),
      payment: this.fb.group({
        cardNumber: '',
        month: '',
        year: '',
        securityCode: '',
      }),
    });

    //coupon
    this.coupon = this.fb.group({
      coupon: '',
    });
  }

  getTotal(): number {
    return this.getSubTotal() + this.getTax();
  }

  getTax(): number {
    return this.getSubTotal() * 0.07;
  }

  getSubTotal(): number {
    return this.cartService.getSubTotal() * this.pricePercent;
  }

  onCheckout() {
    console.log(this.checkoutForm.value);
    this.cartService
      .checkout(this.loginService.currentUser.id.toString())
      .subscribe({
        next: (res) => {
          this.cartService.setCartEmpty();
          this.routerService.navigateByUrl('/thank-you');
        },
        error: (res) => {
          alert('Something went wrong');
        },
      });
  }

  applyCoupon() {
    
    if(this.coupon.value.coupon == '50OFF'){
      this.pricePercent = 0.5
    }
    else if(this.coupon.value.coupon == '100OFF') {
      this.pricePercent = 0;
    }
    else{
      this.pricePercent = 1;
    }
    
    
    console.log(this.coupon.value);

    this.coupon.reset();
  }

  toggle(event: MouseEvent) {
    if ((<HTMLSpanElement>event.target).id === 'infoIcon')
      this.togglePayment = false;
    else this.togglePayment = true;
  }

  changeState(e: any) {
    this.checkoutForm.value.state?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
}
