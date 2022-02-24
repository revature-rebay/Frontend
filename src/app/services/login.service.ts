import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url:string = "http://localhost:8080/";
  show:boolean = false;

  constructor(private http:HttpClient) { }

  registerUser(user:User){

    return this.http.post(this.url + "user", user);

  }

  login(){


  }

}
