import { HttpClient } from '@angular/common/http';
import { Byte } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/product/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  backendURL:string = "http://localhost:9000/";

  //currentlySelectedProduct:ProductModel = new ProductModel(0, "", "", 0, 0, false, 0, new ArrayBuffer(0));
  currentlySelectedProduct:ProductModel = new ProductModel(0, "", "", 0, 0, false, 0);
  allProducts:ProductModel[] = [];

  searchQuery:string = "";

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

  addNewProduct(prod:ProductModel):Observable<boolean> {
    return this.http.post(this.backendURL + "products", prod) as Observable<boolean>;
  }

  updateProduct(prod:ProductModel):Observable<boolean> {
    return this.http.put(this.backendURL + "products", prod) as Observable<boolean>;
  }

  removeProduct(id:number):Observable<boolean> {
    return this.http.delete(this.backendURL + "products/" + id) as Observable<boolean>;
  }

  setCurrentlySelectedProduct(product:ProductModel):void {
    this.currentlySelectedProduct = product;
  }

  getTestImage():Observable<string> {
    return this.http.get(this.backendURL + "products/imgTest", {responseType: 'text'}) as Observable<string>;
  }


}
