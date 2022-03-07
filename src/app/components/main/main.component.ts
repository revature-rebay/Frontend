import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';
import { Product } from 'src/app/models/product/product.model';
import { ProductService } from 'src/app/services/product.service';
import { User } from 'src/app/models/user';
import { temporaryAllocator } from '@angular/compiler/src/render3/view/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  //Initialization
  allProducts:Product[] = [];
  salesProducts: Product[] = [];
  featuredProducts: Product[] = [];
  categoryMapIterationKeys!:Iterable<string>;
  categoryMap:Map<string,Product[]> = new Map();

  
  constructor(private productService:ProductService, private router:Router) { 
  }

  //Get our products as soon as this component is rendered
  ngOnInit(): void {
    this.productService.getFeaturedProducts().subscribe((response: Product[])=> this.featuredProducts = response);
    this.productService.getDiscountedProducts().subscribe((response: Product[])=> this.salesProducts = response);
    this.productService.getAllProducts().subscribe((response:Product[])=> this.allProducts = response);
    
    //Timeout set so Product Service observables can return before category map is made.
    setTimeout(() => {this.makeFeaturedCategories()},300);      
  }

  /*
  Associate a string of category type with an array of products
  If number of items grows too large, product category should be
  added as enumerated type to the product model.
  */
  makeFeaturedCategories(){

    let featuredArr:Product[]=[];
    let clearanceArr:Product[]=[];
    let lowQtyArr:Product[]=[];


    for(let product of this.featuredProducts){
        featuredArr.push(product);
      }
    
    for(let product of this.salesProducts){
        clearanceArr.push(product);
     }

    /*
    could make server side method for getting low qty items,
    since the number of products is tiny performance will 
    not be effected for now.
    */
    for(let product of this.allProducts){
      if(product.currentStock < 20){
        lowQtyArr.push(product);
      }

    }

    //Insert our product arrays into the category map
    this.categoryMap.set('Featured Items!',featuredArr);
    this.categoryMap.set('Clearance Items!',clearanceArr);
    this.categoryMap.set('Limited Quantity!', lowQtyArr);

    /*
    console will throw error if map is iterated over directly, the
    iteration keys are needed 
    */
    this.categoryMapIterationKeys = Array.from(this.categoryMap.keys());
  }
  
  //function to register click on particular product
  productClick(id:number){
    this.router.navigate(['product_details_page/'+id])
  }

  //function to register click of category headline
  categoryClick(name:string){
    if(name.includes('Featured'))
      this.router.navigate(['/featured'])
    if(name.includes('Clearance'))
      this.router.navigate(['/sales'])
  }
}