import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { CartService } from 'src/app/services/cart.service';

import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let service: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      declarations: [CheckoutComponent],
      providers: [FormBuilder],
    }).compileComponents();
    service = TestBed.inject(CartService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Return the price of a discounted object should be $4', () => {
    let product = {
      productId: 9,
      productName: 'mug',
      productDescription: 'A container to hold drinks.',
      productPrice: 5,
      discountPercentage: 0.2,
      featuredProduct: true,
      currentStock: 15,
    };

    expect(component.getPrice(product)).toEqual(4);
  });

  it('Return the price of a non discounted object should be $4.99', () => {
    let product = {
      productId: 9,
      productName: 'mug',
      productDescription: 'A container to hold drinks.',
      productPrice: 4.99,
      discountPercentage: 0.0,
      featuredProduct: false,
      currentStock: 15,
    };

    expect(component.getPrice(product)).toEqual(4.99);
  });

  it('returns the subtotal of the cart should be 100', () => {
    let cartServiceMock = spyOn(service, 'getSubTotal')
      .withArgs()
      .and.returnValue(100);
    expect(component.getSubTotal()).toEqual(100);
  });

  it('returns the subtotal of the cart after coupon', () => {
    let cartServiceMock = spyOn(service, 'getSubTotal')
      .withArgs()
      .and.returnValue(100);
    component.coupon.value.coupon = '50OFF';
    component.applyCoupon();
    expect(component.getSubTotal()).toEqual(50);

    component.coupon.value.coupon = '100OFF';
    component.applyCoupon();
    expect(component.getSubTotal()).toEqual(0);

    component.applyCoupon();
    expect(component.getSubTotal()).toEqual(100);
  });

  it('returns the taxable amount should be 7', () => {
    let cartServiceMock = spyOn(service, 'getSubTotal')
      .withArgs()
      .and.returnValue(100);
      
      expect(Math.trunc(component.getTax())).toEqual(7);
  });

  it('returns the total amount should be 107', () => {
    let cartServiceMock = spyOn(service, 'getSubTotal')
      .withArgs()
      .and.returnValue(100);

    expect(component.getTotal()).toEqual(107);
  });
 

});
