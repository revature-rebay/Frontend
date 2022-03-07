import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CartItem } from '../models/cart-item';
import { CartService } from './cart.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('CartService', () => {
  let service: CartService;
  let cart !: CartItem[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule],
      providers: [CartService]
    });
    
    service = TestBed.inject(CartService);
    cart = [{
      "id": 1,
      "quantity": 10,
      "product": {
          "productId": 9,
          "productName": "mug",
          "productDescription": "A container to hold drinks.",
          "productPrice": 4.99,
          "discountPercentage": 0.0,
          "featuredProduct": false,
          "currentStock": 15
      }
  },
  {
      "id": 2,
      "quantity": 5,
      "product": {
          "productId": 8,
          "productName": "koozie",
          "productDescription": "Keep it cool with this koozie",
          "productPrice": 3.51,
          "discountPercentage": 0.0,
          "featuredProduct": false,
          "currentStock": 20
      }
  }]; 
  service.setCart(cart);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('test cart quantity after setting cart, should be 15 items', () => {
  expect(service.getCartQuantity()).toEqual(15);
})

it('test cart getSubTotal, should be $67.45', ()=> {
  expect(service.getSubTotal()).toEqual(67.45);
})

it('test set cart to empty', ()=>{
  service.setCartEmpty();
  expect(service.getCartQuantity()).toEqual(0);
})


});
