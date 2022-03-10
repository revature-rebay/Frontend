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
  providedIn: 'root',
})
export class CartService {
  baseURL: string = environment.serverURL;

  //A subject to store the last state of a users cart, and propagate changes to the cart to
  //components that subscribe to this subject
  public monitorCart: BehaviorSubject<CartItem[]> = new BehaviorSubject<
    CartItem[]
  >([]);

  constructor(private http: HttpClient, private routerService: Router) {}

  //get current Router path
  getPath() {
    return this.routerService.url;
  }

  //gets the subtotal before tax of all the items in the cart
  getSubTotal() {
    let subtotal = 0;
    this.monitorCart.subscribe((res) => {
      if (res) {
        res.forEach((item) => {
          if (item.product.discountPercentage)
            subtotal +=
              (item.product.productPrice -
                item.product.discountPercentage * item.product.productPrice) *
              item.quantity;
          else subtotal += item.product.productPrice * item.quantity;
        });
      }
    });
    return subtotal;
  }

  //gets the total number of items in a users cart
  getCartQuantity() {
    let total = 0;
    this.monitorCart.subscribe((res) => {
      if (res) {
        res.forEach((item) => {
          total += item.quantity;
        });
      }
    });
    return total;
  }

  //clears a users cart setting it to empty
  public setCartEmpty() {
    this.monitorCart.next([]);
  }

  //updates the monitorCart subject with the .next() call with the response of the given observable
  //which is a list of CartItems
  private cartObservableUpdate(currentCart: Observable<CartItem[]>) {
    currentCart.subscribe((res) => {
      this.monitorCart.next(res);
    });
  }

  //used only for testing
  setCart(cart: CartItem[]) {
    this.monitorCart.next(cart);
  }

  //Makes a http request to the backend to get a users cart and returns the observable.
  //Also updates monitorCart with the cartObservableUpdate call
  getCart(userId: string): Observable<CartItem[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'my-auth-token',
      }),
    };
    let currentCart = this.http.get<CartItem[]>(
      `${this.baseURL}cart/${userId}`,
      httpOptions
    );
    this.cartObservableUpdate(currentCart);
    return currentCart;
  }

  //Makes a http request to the backend to add an item to a users cart and returns the observable.
  //Also updates monitorCart with the cartObservableUpdate call
  addProductToCart(
    userId: string,
    productId: string,
    quantity: string
  ): Observable<any[]> {
    console.log(userId);
    console.log(productId);
    console.log(quantity);
    let body = {
      userId: Number.parseInt(userId),
      productId: Number.parseInt(productId),
      quantity: Number.parseInt(quantity),
    };
    console.log(body);
    let response = this.http.post<any>(this.baseURL + 'cart/add', body).pipe();
    this.cartObservableUpdate(response);
    return response;
  }

  //Makes a http request to the backend to update an item to a users cart and returns the observable.
  //Also updates monitorCart with the cartObservableUpdate call
  updateProductQuantity(cartItem: CartDTO): Observable<CartItem[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'my-auth-token',
      }),
    };
    const body = JSON.stringify(cartItem);
    let response = this.http.put<CartItem[]>(
      `${this.baseURL}cart/update`,
      body,
      httpOptions
    );
    this.cartObservableUpdate(response);
    return response;
  }

  //Makes a http request to the backend to delete an item to a users cart and returns the observable.
  //Also updates monitorCart with the cartObservableUpdate call
  deleteProduct(cartItem: CartDTO): Observable<CartItem[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'my-auth-token',
      }),
    };
    const body = JSON.stringify(cartItem);
    let response = this.http.put<CartItem[]>(
      `${this.baseURL}cart/delete`,
      body,
      httpOptions
    );
    this.cartObservableUpdate(response);
    return response;
  }

  //Makes a http request to the backend to clear a users cart and returns the observable.
  //Also updates monitorCart with the cartObservableUpdate call
  clearCart(userId: string): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'my-auth-token',
        observe: 'response',
      }),
    };
    let response = this.http.delete(`${this.baseURL + userId}`, httpOptions);
    this.monitorCart.next([]);
    return response;
  }

  //Makes a http request to the backend to checkout a user and returns the observable.
  //Also updates monitorCart with the cartObservableUpdate call
  checkout(userId: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'my-auth-token',
        options: 'response',
      }),
    };
    return this.http.put(`${this.baseURL}cart/checkout/${userId}`, httpOptions);
  }
}
