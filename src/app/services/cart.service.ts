import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartItem } from '../models/cart-item';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/product/product.model';
import { CartDTO } from '../models/cart-dto';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseURL: string = "http://localhost:9000/";
  
  cart !: CartItem[];

  constructor(private http:  HttpClient) { 
  }

  getCart(userId:string):Observable<CartItem[]>{
    // getCart(userId:string):CartItem[]{
   
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'my-auth-token'
      }),
    };

    //TODO Get UserId dynamicaly
    return this.http.get<CartItem[]>(`${this.baseURL}cart/${userId}`, httpOptions);
    
    
    // let product = new ProductModel(1, 'TV', 'Giant Screen TV', 50, 0, true, 50, new ArrayBuffer(56));
    // let item = {
    //   id:1,
    //   quantity:2,
    //   product: product
    // };

    // let product2 = new ProductModel(2, 'Fridge','Modern design', 150, 0, true, 50, new ArrayBuffer(56));

    // let item2 = {
    //   id:1,
    //   quantity:5,
    //   product: product2
    // };

    // let product3 = new ProductModel(3, 'PC','Budget PC', 250, 0, true, 50, new ArrayBuffer(56));

    // let item3 = {
    //   id:1,
    //   quantity:1,
    //   product: product3
    // };

    // return [item, item2, item3]
  }

  addProductToCart(userId:string, productId:string, quantity:string):Observable<any[]>{
    console.log(userId)
    console.log(productId)
    console.log(quantity)
    let body = {
      userId:Number.parseInt(userId),
      productId:Number.parseInt(productId),
      quantity:Number.parseInt(quantity)
    };
    console.log(body);
    let respone = this.http.post<any>(this.baseURL+"cart/add", body).pipe()
    console.log(respone);
    return respone;
  }

  updateProductQuantity(cartItem:CartDTO):Observable<CartItem[]> {
    const httpOptions= {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'my-auth-token'
      })
    };
    const body = JSON.stringify(cartItem);
    return this.http.put<CartItem[]>(`${this.baseURL}cart/update`, body, httpOptions);
  }


  deleteProduct(cartItem:CartDTO):Observable<CartItem[]> {
    const httpOptions= {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'my-auth-token'
      })
    };
    const body = JSON.stringify(cartItem);
    return this.http.put<CartItem[]>(`${this.baseURL}cart/delete`, body, httpOptions);
  }

 clearCart(userId: string): Observable<Object> {
  const httpOptions= {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'my-auth-token',
      observe: 'response'
    })
  };
  return this.http.delete(`${this.baseURL + userId}`, httpOptions);
 }

 //remove - was just for temp testing
//  tempDel(productId:number){
//    this.cart = this.getCart("1").filter(item => {
//      if(item.product.productId != productId) return item;
//      return;
//    })
//    return this.cart;
//  }
}
