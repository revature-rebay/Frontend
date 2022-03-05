import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartItem } from '../models/cart-item';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartDTO } from '../models/cart-dto';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseURL: string = environment.serverURL;
  public monitorCart: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
  
  constructor(private http: HttpClient, private routerService:Router) { 
  }
  //get current Router path
  getPath(){
    return this.routerService.url;
  }
  getSubTotal(){
    let subtotal = 0;
    this.monitorCart.subscribe(res => {
      if(res) {
        res.forEach(item => {
          if(item.product.featuredProduct) subtotal += ((item.product.productPrice - (item.product.discountPercentage * item.product.productPrice)) * item.quantity)
          else subtotal += (item.product.productPrice * item.quantity)
        })
      }
    });
    return subtotal;
  }

  getCartQuantity(){
    let total = 0;
    this.monitorCart.subscribe(res => {
      if(res) {
        res.forEach(item => {
          total += (item.quantity)
        })
      }
    });
    return total;
  }

  public setCartEmpty(){
    this.monitorCart.next([]);
  }

  private cartObservableUpdate(currentCart:Observable<CartItem[]>){
    currentCart.subscribe(res => {
      this.monitorCart.next(res);
    });
  }

  getCart(userId:string):Observable<CartItem[]>{
   
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'my-auth-token'
      }),
    };

    //TODO Get UserId dynamicaly
    let currentCart = this.http.get<CartItem[]>(`${this.baseURL}cart/${userId}`, httpOptions);
    this.cartObservableUpdate(currentCart);
    return currentCart;
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
    let response = this.http.post<any>(this.baseURL+"cart/add", body).pipe()
    this.cartObservableUpdate(response);
    return response;
  }

  updateProductQuantity(cartItem:CartDTO):Observable<CartItem[]> {
    const httpOptions= {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'my-auth-token'
      })
    };
    const body = JSON.stringify(cartItem);
    let response = this.http.put<CartItem[]>(`${this.baseURL}cart/update`, body, httpOptions);
    this.cartObservableUpdate(response);
    return response;
  }


  deleteProduct(cartItem:CartDTO):Observable<CartItem[]> {
    const httpOptions= {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'my-auth-token'
      })
    };
    const body = JSON.stringify(cartItem);
    let response = this.http.put<CartItem[]>(`${this.baseURL}cart/delete`, body, httpOptions);
    this.cartObservableUpdate(response);
    return response;
  }

 clearCart(userId: string): Observable<Object> {
  const httpOptions= {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'my-auth-token',
      observe: 'response'
    })
  };
  let response = this.http.delete(`${this.baseURL + userId}`, httpOptions);
  this.monitorCart.next([]);
  return response
 }

 checkout(userId: string):Observable<any> {
  const httpOptions= {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'my-auth-token',
      options: 'response'
    }), 
  };
  return this.http.put(`${this.baseURL}cart/checkout/${userId}`, httpOptions);
 }
}
