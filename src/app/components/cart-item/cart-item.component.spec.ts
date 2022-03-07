import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemComponent } from './cart-item.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('CartItemComponent', () => {
  let component: CartItemComponent;
  let fixture: ComponentFixture<CartItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [CartItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Return the price of a discounted object', () => {
    component.featuredProduct = true;
    component.productPrice = 10;
    component.discountPercentage = 0.2;
    expect(component.getPrice()).toEqual(8);
    expect(component.getPrice() != 8).toBeFalse();
  });

  it('Return the price of a non discounted object', () => {
    component.featuredProduct = false;
    component.productPrice = 10;
    component.discountPercentage = 0.2;
    expect(component.getPrice()).toEqual(10);
  });

  it('Return a string for a Path to an image', () => {
    component.productName = 'pen';
    expect(component.setImage()).toEqual('assets/images/pen.jpg');
  });
});
