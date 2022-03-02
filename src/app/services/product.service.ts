import { HttpClient } from '@angular/common/http';
import { Byte } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  backendURL:string = "http://localhost:9000/";

  //currentlySelectedProduct:ProductModel = new ProductModel(0, "", "", 0, 0, false, 0, new ArrayBuffer(0));
  currentlySelectedProduct:Product = new Product(0, "", "", 0, 0, false, 0);
  allProducts:Product[] = [];

  searchQuery:string = "";

  constructor(private http:HttpClient) { }

  getAllProducts():Observable<Product[]> {
    return this.http.get(this.backendURL + "products") as Observable<Product[]>;
  }

  updateAllProduct():void {
    this.getAllProducts().subscribe(
      (response:Product[]) => {
        this.allProducts = response;
      }
    )

  }

  getProduct(productId:number):Observable<Product> {
    return this.http.get(this.backendURL + "products/" + productId) as Observable<Product>;
  }

  getFeaturedProducts():Observable<Product[]> {
    return this.http.get(this.backendURL + "products/featured") as Observable<Product[]>;
  }

  getDiscountedProducts():Observable<Product[]> {
    return this.http.get(this.backendURL + "products/discount") as Observable<Product[]>;
  }

  addNewProduct(prod:Product):Observable<boolean> {
    return this.http.post(this.backendURL + "products", prod) as Observable<boolean>;
  }

  updateProduct(prod:Product):Observable<boolean> {
    return this.http.put(this.backendURL + "products", prod) as Observable<boolean>;
  }

  removeProduct(id:number):Observable<boolean> {
    return this.http.delete(this.backendURL + "products/" + id) as Observable<boolean>;
  }

  setCurrentlySelectedProduct(product:Product):void {
    this.currentlySelectedProduct = product;
  }

  getTestImage():Observable<string> {
    return this.http.get(this.backendURL + "products/imgTest", {responseType: 'text'}) as Observable<string>;
  }


}
