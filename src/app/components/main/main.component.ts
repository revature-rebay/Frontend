import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';
import { Product } from 'src/app/models/product/product.model';
import { ProductService } from 'src/app/services/product.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  products: Product[] = [];
  featuredProducts: Product[] = [];
  currentUser!:User;
  constructor(private productService:ProductService, private navService: NavigationService) { }

  ngOnInit(): void {
    this.productService.getFeaturedProducts().subscribe((response: Product[])=> this.featuredProducts = response);
    //console.log(this.featuredProducts);
    console.log(this.currentUser);
  }








  
  // quantity incrementer 
  quantity:number = 1;
  i=1;
  plus(){
    if(this.i < 100){
      this.i++;
      this.quantity = this.i;
    }
  }
  minus(){
    if(this.i != 1){
      this.i--;
      this.quantity = this.i;
    }
  }
  

}