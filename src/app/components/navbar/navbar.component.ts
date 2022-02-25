import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    currentUser!: User;

  constructor(private user: LoginService, private router:Router) {

   }

  ngOnInit(): void {
    this.updateNavbarUser();
    console.log(this.currentUser);
    
  }

  updateNavbarUser(): void {
    this.currentUser = new User();
    delay(1000);
    console.log("updated current user info");
  }

  revealCurrentUser():void {
    console.log(this.currentUser);
  }

  userLoggedIn():boolean {
    if (this.currentUser.id == 0) return false;
    return true;
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
