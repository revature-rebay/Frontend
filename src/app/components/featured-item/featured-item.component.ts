import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-featured-item',
  templateUrl: './featured-item.component.html',
  styleUrls: ['./featured-item.component.css']
})
export class FeaturedItemComponent implements OnInit {

  products: Product[] = [];
  
  constructor( private product:ProductService, private router:Router) { 
  }
  getDetails(productId:number){
    if (this.product.exists(productId)){
      this.router.navigate(['/product_details_page/'+ productId])
    }else{
      alert("This product doesn't exist");
    }
    // this.filteringAlgorithm(this.productService.getCachedProducts());
  }

  ngOnInit(): void {
    this.product.getFeaturedProducts().subscribe((response: Product[])=> this.products = response);
  }

  setProductImage(product:Product):string {
    return 'assets/images/' + product.productName + '.jpg'; 
  }

  updateImageUrl(event:Event):void {
    let htmlEmitter = event.target as HTMLImageElement;
    htmlEmitter.src = "assets/images/stockImage.jpg";
  }

}
