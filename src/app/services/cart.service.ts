import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { ProductModel } from '../models/product/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  
  private cart !: CartItem[];

  constructor() { 
    this.cart = this.getCart();
  }

  getCart():CartItem[] {
   
    //temp
    //remove
    let product = new ProductModel(1, 'TV', 50, 0, true, 50, new ArrayBuffer(56));
    

    let item = {
      id:1,
      quantity:2,
      product: product
    };

    let product2 = new ProductModel(2, 'Fridge', 150, 0, true, 50, new ArrayBuffer(56));

    let item2 = {
      id:1,
      quantity:2,
      product: product2
    };

    let product3 = new ProductModel(3, 'PC', 250, 0, true, 50, new ArrayBuffer(56));

    let item3 = {
      id:1,
      quantity:2,
      product: product3
    };

    return [item, item2, item3]
  }
}
