import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/product/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  backendURL:string = "http://localhost:8080/";
  constructor(private http:HttpClient) { }

  getAllProducts():Observable<ProductModel[]> {
    return this.http.get(this.backendURL + "products") as Observable<ProductModel[]>;
  }

  getProduct(productId:number):Observable<ProductModel> {
    return this.http.get(this.backendURL + "products/" + productId) as Observable<ProductModel>;
  }

  getFeaturedProducts():Observable<ProductModel[]> {
    return this.http.get(this.backendURL + "products/featured") as Observable<ProductModel[]>;
  }

  getDiscountedProducts():Observable<ProductModel[]> {
    return this.http.get(this.backendURL + "products/discount") as Observable<ProductModel[]>;
  }
}
