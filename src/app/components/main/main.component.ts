import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product/product.model';
import { NavigationService } from 'src/app/services/navigation.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  products: ProductModel[] = [];
  constructor(private navService: NavigationService) { }

  ngOnInit(): void {
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