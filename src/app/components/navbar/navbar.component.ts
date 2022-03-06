import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    currentUser!: User;
    searchQuery:string = "";

  constructor(public user: LoginService, private router:Router, private navService: NavigationService, private productService:ProductService, private cartService:CartService) {
    this.updateNavbarUser();
   }

  ngOnInit(): void {
    this.updateNavbarUser();
  }

  signUpRoute(){
    this.user.checked = false;
  }

  loginRoute(){
    this.user.checked = true;
  }

  getCartQuantity(): number{
    return this.cartService.getCartQuantity();
  }

  updateNavbarUser(): void {
    this.currentUser = this.user.getCookie();
  }

  revealCurrentUser():void {
    console.log(this.currentUser);
  }

  userLoggedIn():boolean {
    return this.user.userLoggedIn();
  }

  isAdmin():boolean{
    return this.user.currentUser.admin
  }

  logOut():void {
    this.user.logout().subscribe({
      next:()=>{
        alert("successfully logged out.") 
        this.user.removeUser();
        //redirect to the main page if not there already
        // this.router.navigateByUrl(""); // maybe route back to login page? don't know how we wanna set this up
      },
      error:()=>{
        console.log("error");
      }
    }
    )
  }

  //displays user cart as a slide in side panel
  toggleSideNav() {
    if(!this.router.url.match('/cart_detail_page')) this.navService.toggleShowNav();
  }

  applySearch():void {
    this.productService.searchQuery = this.searchQuery;
    this.searchQuery = ""; //reset the query in the bar
    this.router.navigateByUrl("redirect/search_results");
  }

}
