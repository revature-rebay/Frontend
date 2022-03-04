import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FrontEnd';
  visible:boolean = true;

  constructor(private router: Router, private login:LoginService) { }

  ngOnInit() : void {
    this.visible = true;
    this.router.navigate([`main`]);

  }


}


