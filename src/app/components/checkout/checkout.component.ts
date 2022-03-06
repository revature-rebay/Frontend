import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { States } from 'src/app/models/states';
import { checkoutAnimation } from 'src/app/animations/checkoutAnimations';
import { CartItem } from 'src/app/models/cart-item';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product/product.model';
import { CartDTO } from 'src/app/models/cart-dto';
import { Validator } from 'src/app/models/validator';

@Component({
  encapsulation: ViewEncapsulation.None,
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
  badCart = false;
  notInStock !: CartItem[];
  emailPattern = '[A-Za-z]{1,32}([A-Za-z]|[0-9]){0,32}(@)[A-Za-z]{1,121}([A-Za-z]|[0-9]){0,121}\\.[a-z]{3}'
  

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
      firstName: [this.loginService.currentUser.firstName, [Validators.required]],
      lastName: [this.loginService.currentUser.lastName, [Validators.required]],
      phoneNumber: ['', [Validators.pattern('[1-9]{3}[0-9]{3}[0-9]{4}')]],
      email: [this.loginService.currentUser.email, [Validators.required, Validators.pattern(this.emailPattern)]],
      address: this.fb.group({
        street: ['', [Validators.required]],
        address2: '',
        city: ['', [Validators.required]],
        state: ['Alabama', [Validators.required]],
        country: [
          {
            value: 'United States of America',
            disabled: true,
          },
        ],
        zipcode: ['',[Validators.required, Validators.pattern('[0-9]{5}')]],
      }),
      payment: this.fb.group({
        cardNumber: '',
        month: '',
        year: '',
        securityCode: '',
      },{validators:[Validators.required]}),
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
    if(this.checkoutForm.status === 'INVALID'){
      alert('Please complete checkout form')
    }
    else {
      this.cartService
      .checkout(this.loginService.currentUser.id.toString())
      .subscribe({
        next: (res) => {
          if(res) { //items to be bought are out of stock
            this.badCart = true;
            this.notInStock = res;
          }
          else {
            this.cartService.setCartEmpty();
            this.routerService.navigateByUrl('/thank-you');
          }
        },
        error: (res) => { //happens when cart is empty
          alert('Your cart is empty, unable to complete checkout');
        },
      });
    }
  }

  applyCoupon() {
  
    if(!this.coupon.value.coupon) {
      this.pricePercent = 1;
    }
    else if(this.coupon.value.coupon.toUpperCase() == '50OFF'){
      this.pricePercent = 0.5
    }
    else if(this.coupon.value.coupon.toUpperCase() == '100OFF') {
      this.pricePercent = 0;
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

  getPrice(product:Product){
    if(product.featuredProduct) return (product.productPrice - (product.productPrice * product.discountPercentage));
    return product.productPrice
  }

  delete(){
    this.notInStock.forEach(item => {
      this.cartService.deleteProduct(<CartDTO>{userId:this.loginService.currentUser.id, quantity:0, productId:item.product.productId})
     console.log(item);
    })
    this.notInStock = [];
    this.badCart = false;
  }

  getFormControlField(field:string){
    return this.checkoutForm.get(field)
  }
}
