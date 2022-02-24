import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

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

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.user.userName = this.userName;
    this.user.passWord = this.passWord;

    this.loginService.login(this.user).subscribe({
      next: response => {
        this.user = response
        console.log(this.user);


        if (this.user != null) {
          this.router.navigate([`main`]);
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

    this.loginService.registerUser(this.user).subscribe({
      next: () => {
        this.loginService.login(this.user).subscribe({
          next: () => {
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
