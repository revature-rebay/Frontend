import { Component, Injectable, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  
})

export class LoginComponent implements OnInit {

  id: number = 0;
  userName: string = "";
  passWord: string = "";
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  user: User = new User();
  loginTabSelected: boolean = true;
  navbarVisible!: boolean;

  constructor(
    private router: Router,
    private loginService: LoginService
    //private app: AppComponent
  ) { }

  ngOnInit() : void {
    console.log("in login init");
    this.loginTabSelected = this.loginService.loginTabSelected;
    //this.app.visible = false;
    this.loginService.navbarVisible = false;
  }

  ngOnDestroy() : void {
    //this.app.visible = true;
    this.loginService.navbarVisible = true;
  }

  login() {

    this.user.userName = this.userName;
    this.user.passWord = this.passWord;

    this.loginService.login(this.user).subscribe({
      next: response => {
        this.user = response

        if (this.user != null) {
          this.router.navigate([`main`]);
          this.loginService.currentUser = this.user; // using this now to set current user
        }
      },
      error: (response) => {
        if (response.status == 400) {
          alert("Invalid Credentials")
        }
      }
    })
  }

  signup() {

    this.user.userName = this.userName;
    this.user.passWord = this.passWord;
    this.user.email = this.email;
    this.user.firstName = this.firstName;
    this.user.lastName = this.lastName;

    let regex = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{9,16}$/;
    let emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    
    if (!regex.test(this.passWord)) {
      alert("Password can't have white spaces, must contain one symbol, digit & uppercase letter AND must be 9-16 characters long")
    }
    else if(!emailRegex.test(this.email)){
        alert("Not a valid a email")
    }
    else if(this.userName == "" || this.firstName == "" || this.lastName == ""){
        alert("Fields can't be empty")
    }
    else{
        this.loginService.registerUser(this.user).subscribe({
          next: () => {  
            this.loginService.login(this.user).subscribe({
              next: (response) => {
                this.user = response
                this.loginService.currentUser = this.user
                console.log(this.user)
                this.router.navigate([`main`]);
              }
            })
          },
          error: (response) => {
            if (response.status == 500) {
              alert("email or username already taken")
            }
          }
        })
    }
  }
}
