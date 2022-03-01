import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    currentUser!: User;

  constructor(public user: LoginService, private router:Router) {
    this.updateNavbarUser();
   }

  ngOnInit(): void {
    this.updateNavbarUser();
    
  }

  updateNavbarUser(): void {
    this.currentUser = this.user.getCurrentUser();
  }

  revealCurrentUser():void {
    console.log(this.currentUser);
  }

  userLoggedIn():boolean {
    return this.user.userLoggedIn();
  }

  logOut():void {
    this.user.logout().subscribe(
      (response) => {
        if (response.status == 200){ // check the header response from logout request
          alert("successfully logged out.") 
          this.user.removeUser();
          //redirect to the main page if not there already
          // this.router.navigateByUrl(""); // maybe route back to login page? don't know how we wanna set this up
        }
      }
    )
  }

}
