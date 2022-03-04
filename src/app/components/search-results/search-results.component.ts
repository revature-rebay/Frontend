import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  currentSearch:string = "";
  allProducts:Product[] = []; //TODO: pull this from the service with routing parameters
  filteredProducts:Product[] = []; //TODO: consider making this a set so we don't get any repeat products

  constructor(private productService:ProductService, private router:Router) { }

  ngOnInit(): void {
    //reset the current array
    this.filteredProducts = [];
    this.currentSearch = this.productService.searchQuery;
    this.getAllProducts();
  }

  getAllProducts():void {
    this.productService.getAllProducts().subscribe(
      (response:Product[]) => {
        this.allProducts = response;

        //for now, call filtering algorithm inside of the Observable subscription to avoid undefined errors
        this.filteringAlgorithm();
      }
    )
  }

  // goToDetailsPage(product:Product):void {
  //   //set the currently selected product in the product service
  //   this.productService.currentlySelectedProduct = product;

  //   //then route to the product details page
  //   this.router.navigateByUrl("product_details_page");
  // }

  getDetails(productId:number){
    if (this.productService.exists(productId)){
      this.router.navigate(['/product_details_page/'+ productId])
    }else{
      alert("This product doesn't exist");
    }
  }

  anyProducts():boolean {
    if (this.filteredProducts.length == 0) return false;
    return true;
  }

  filteringAlgorithm():void {
    //

    //Loop through all products in the database (which are stored in the allProducts array) and add any products
    //that pass all the search criteria listed below to the filteredProducts array.

    /*
    NOTE - in the real world this algorithm would be in the backend so we could query the database to only give us products 
    related to our search as opposed to getting every physical product in the database. However, since there's currently only
    about 15 products in the database it's really not a big deal. A future batch should move this search functionality to the
    backend once more products get added for better efficiency.
    */

    //First and foremost, if the search bar is blank then don't show any products
    if (this.currentSearch == "") {
      //console.log("Please enter a search query");
      return;
    }

    //Split the search query into individual words so that each one can be checked against product names independently
    let searchWords:string[] = this.currentSearch.split(" ");
    //console.log(searchWords);

    //compare all words in the query against every product in the allProducts array
    for (let product of this.allProducts) {
      for (let currentSearchWord of searchWords) {
        let productName = product.productName;

        //first we check for an exact match
        if (productName == currentSearchWord) {
          //console.log("found a match:" + productName);
          this.filteredProducts.push(product);
          continue; //move onto the next product if match is found
        }

        //check to see if any products fully contain the search string
        if (productName.includes(currentSearchWord) || currentSearchWord.includes(productName)) {
          //console.log("found a match:" + productName);
          this.filteredProducts.push(product);
          continue; //move onto the next product if match is found
        }

        /*
        As a final check, see if the currentSearchWord is "similar" to the current product. This is accomplished
        by scanning each charcter in the currentSearchWord until it's found in the current product name. Once it's
        found, move onto the next character (however, don't search product name from beginning, start at current
        position). If at least 80% of the characters in the currentSearchWord are found in the product name in this
        manner it will be considered "close enough".
        
        As an example of this block in action, let's pretend we want to search for the word "black", but we make a
        typo and forget the 'a' so we instead search on "blck". We'd find no matches from the above two IF statements.
        With the below FOR loop and IF statement, however, the 'b', 'l', 'c' and 'k' characters would all be found in
        the appropriate order in the products named "black_hat" and "black_shirt". Flipping the script now, if we
        searched on the word "blue" then only the characters 'b' and 'l' would be found. Since only 2 of the 4 letters
        in the input were matched (50%) and we require 80% of characters to be found, then neither of the "black" products
        would be found. If our search query only consisted of the letters 'b' and 'l', however, we'd get a 100% letter
        match, so not only would we find the two "black" products, we'd also found another product called "stress_ball".

        This algorithm works pretty well when characters are ommited by accident, however, if letters are added by mistake
        or the character order is just input wrong (i.e. typing "balck" instead of "black") it won't find matches as
        easily. This is currently by design, however, and can be changed by added more logic after the below IF statement
        */

        let productCharacterLocation:number = 0; //represents the current character in the product name
        let currentCharacterLocation:number = 0; //represents the current character in the currentSearchWord
        let charactersFound:number = 0; //increment everytime a match is found

        while (productCharacterLocation < productName.length) {
          if (currentCharacterLocation == currentSearchWord.length) break; //all letters have been found so break out of this loop
          if (currentSearchWord.charAt(currentCharacterLocation) == productName.charAt(productCharacterLocation++)) {
            charactersFound++
            currentCharacterLocation++; //move onto the next letter in the search query
          }
        }

        if (charactersFound / currentSearchWord.length >= 0.80) {
          //console.log("found a match:" + productName);
          this.filteredProducts.push(product);
          continue; //move onto the next product if match is found
        }
      }
    }
  }

  setImage(p:Product):string{
    return 'assets/images/' + p.productName + '.jpg'; 
  }

  onSale(p:Product):boolean {
    if (p.discountPercentage > 0) return true;
    return false;
  }

  updateImageUrl(event:Event):void {
    let htmlEmitter = event.target as HTMLImageElement;
    htmlEmitter.src = "assets/images/stockImage.jpg";
  }
  
}
