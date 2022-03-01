export class Product {

    productId: number;
  productName: string;
  productDescription: string;
  productPrice: number;
  discountPercentage: number;
  featuredProduct: boolean;
  currentStock: number;
  //productImage: ArrayBuffer;

  //constructor(productId: number, productName: string, productDescription: string, productPrice: number, discountPercentage: number, featuredProduct: boolean, currentStock: number, productImage: ArrayBuffer) 
  constructor(productId: number, productName: string, productDescription: string, productPrice: number, discountPercentage: number, featuredProduct: boolean, currentStock: number) {
    this.productId = productId;
    this.productName = productName;
    this.productDescription = productDescription;
    this.productPrice = productPrice;
    this.discountPercentage = discountPercentage;
    this.featuredProduct = featuredProduct;
    this.currentStock = currentStock;
    //this.productImage = productImage;
   }
}
