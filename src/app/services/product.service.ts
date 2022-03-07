import { HttpClient } from '@angular/common/http';
import { Byte } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // backendURL:string = "http://localhost:9000/";
  backendURL: string = environment.serverURL;

  // currentlySelectedProduct:Product = new Product(0, "", "", 0, 0, false, 0);
  allProducts:Product[] = [];

  searchQuery:string = "";

  constructor(private http:HttpClient) { 
    this.updateAllProducts();
  }

  getAllProducts():Observable<Product[]> {
    return this.http.get(this.backendURL + "products") as Observable<Product[]>;
  }

  updateAllProducts():void {
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
    return this.http.get(this.backendURL + "products/clearance") as Observable<Product[]>;
  }

  addNewProduct(prod:Product):Observable<boolean> {
    return this.http.post(this.backendURL + "products/add", prod) as Observable<boolean>;
  }

  updateProduct(prod:Product):Observable<boolean> {
    return this.http.put(this.backendURL + "products/update", prod) as Observable<boolean>;
  }

  removeProduct(id:number):Observable<boolean> {
    return this.http.delete(this.backendURL + "products/remove" + id) as Observable<boolean>;
  }

  removeLocalProduct(id:number):void{
    //search the allProducts[] array on the product whose id matches the id of the given product and update it to reflect
    //the given product
    for (let prod:number = 0; prod < this.allProducts.length; prod++) {
      if (this.allProducts[prod].productId == id) {
        this.allProducts.splice(prod, 1);
        return;
      }
    }
  }

  // setCurrentlySelectedProduct(product:Product):void {
  //   this.currentlySelectedProduct = product;
  // }

  getLoadedProductById(productId:number):Product {
    //console.log("here's all the products: " + this.allProducts[0].productId);
    // let foundProduct = this.allProducts.find(prod => {productId === prod.productId});
    // if (foundProduct) {
    //   return foundProduct;
    // }

    // console.log("couldn't find product");
    // return new Product(0, "", "", 0, 0, false, 0);
    for (let prod of this.allProducts) {
      if (prod.productId == productId) return prod;
    }

    return new Product(0, "", "", 0, 0, false, 0);
  }

  getTestImage():Observable<string> {
    return this.http.get(this.backendURL + "products/imgTest", {responseType: 'text'}) as Observable<string>;
  }

  getCachedProducts():Product[] {
    return this.allProducts;
  }

  localUpdateProduct(product:Product):void {
    //search the allProducts[] array on the product whose id matches the id of the given product and update it to reflect
    //the given product
    for (let prod of this.allProducts) {
      if (prod.productId == product.productId) {
        prod = product;
        return;
      }
    }
  }

  exists(productId: number): boolean{
    for (let prod of this.allProducts){
      if (prod.productId === productId){
        return true;
      }
    }

    return false;
  }
  
}
