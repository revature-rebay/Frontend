import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { single } from 'rxjs';
import { Product } from 'src/app/models/product/product.model';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-featured-card',
  templateUrl: './featured-card.component.html',
  styleUrls: ['./featured-card.component.css']
})
export class FeaturedCardComponent implements OnInit {
  
  @Input() productList!:Product[] | undefined;
  @Input() category!:string;
  @Output() onCategoryClick:EventEmitter<string> = new EventEmitter;
  @Output() onImageClick:EventEmitter<number> = new EventEmitter;

  cardCount:number = 0;
  displayName!:string;

  constructor(private router:Router, private cart:CartService, private login:LoginService) { }

  ngOnInit(): void {}

  //Emit click on category
  categoryClick(category:string){
    this.onCategoryClick.emit(category);
  }

  //Emit click on image
  imageClick(id:number){
    this.onImageClick.emit(id);
  }
}