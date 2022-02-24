import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  registerUser(user: User) {

    return this.http.post(this.url + "user", user);

  }

  login(user: User) {
    console.log(user);

    return this.http.post<User>(this.url + "user/login", user, { withCredentials: true });

  }

  logout() {

    return this.http.post(this.url + "user/logout", null, { withCredentials: true });

  }

  getCurrentUser() {
    return this.http.get<User>(this.url + "user/current", { withCredentials: true });
  }

  getUserById(id: number) {
    return this.http.get<User>(this.url + "user/" + id, { withCredentials: true });
  }

}
