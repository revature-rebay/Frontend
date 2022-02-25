import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    //currentUser!: CurrentUserService;
    currentUser!: User;

  constructor(private user: LoginService, private router:Router) { }

  ngOnInit(): void {
  }

}
