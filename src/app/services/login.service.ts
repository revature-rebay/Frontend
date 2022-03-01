import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUser: User = new User(); // I added this line

  url: string = "http://localhost:8080/";

  // constructor(private currentUser: User ,private http: HttpClient) { 
  constructor(private http: HttpClient) { 
    this.currentUser  = new User(); //starts off as a blank user upon instantiation (I added this line)
  }

  registerUser(user: User) {
    return this.http.post(this.url + "user", user);
  }

  userLoggedIn():boolean {
    if (this.currentUser.id == 0 || this.currentUser == undefined) return false;
    return true;
  }

  login(user: User) {
    return this.http.post<User>(this.url + "user/login", user, { withCredentials: true });
  }

  removeUser():void {
    // this function is used when logging out
    // It erases cached information about the user that was previously logged in
    this.currentUser  = new User();
  }

  logout():Observable<any> {
    return this.http.post(this.url + "user/logout", { withCredentials: true });
  }

  getCurrentUser():User {
    // original endpoint for getting current user - still available for use
    // return this.http.get<User>(this.url + "user/current", { withCredentials: true });
    return this.currentUser;
  }

  getUserById(id: number) {
    return this.http.get<User>(this.url + "user/" + id, { withCredentials: true });
  }

}
