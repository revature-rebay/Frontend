import { ProductModel } from "./product/product.model";
export interface CartItem {
    id:number,
    quantity:number,
    product: ProductModel, //temp
}

