import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  title = 'FrontEnd';
  navbarVisible:boolean = true;

  constructor(private router: Router, private login:LoginService) { }

  ngOnInit() : void {
    this.router.navigate([`main`]);
  }

  ngDoCheck() : void {
      this.navbarVisible = this.login.navbarVisible;
  }


}


