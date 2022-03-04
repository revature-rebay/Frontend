import { Product } from "./product/product.model";
export interface CartItem {
    id:number,
    quantity:number,
    product: Product, //temp
}

