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
      (response:number) => {
        if (response == 0) alert("successfully logged out.")

        //redirect to the main page if not there already
        this.router.navigateByUrl("");
      }
    )
  }

}
