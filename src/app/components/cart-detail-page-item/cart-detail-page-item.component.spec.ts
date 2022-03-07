import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CartDetailPageItemComponent } from './cart-detail-page-item.component';

describe('CartDetailPageItemComponent', () => {
  let component: CartDetailPageItemComponent;
  let fixture: ComponentFixture<CartDetailPageItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [CartDetailPageItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartDetailPageItemComponent);
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
