import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  currentSearch:string = "";
  allProducts:Product[] = [];
  filteredProducts:Product[] = [];

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    console.log(this.productService.searchQuery);
    this.currentSearch = this.productService.searchQuery;
  }

  filteringAlgorithm():void {
    //this function will scan the allProducts array and if a product name is "close enough" to the currentSearch field
    //then a copy of the current product will be added to the filteredProducts array

    //TODO: the filtered prodcuts should appear as product card (like the featured group is working on) so steal their code
    //when their done (potential blocker, waiting on them to finish code for us to steal!)
  }

}
