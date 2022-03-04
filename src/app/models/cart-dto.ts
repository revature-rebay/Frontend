export class CartDTO {

    userId:number = 0;
    quantity:number = 0;
    productId: number = 0; //temp
  
  
  public CartDTOModule(userId:number, quantity:number, productId:number){
    this.userId=userId;
    this.quantity=quantity;
    this.productId=productId;
  }
}
