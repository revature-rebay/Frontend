import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { LoginService } from 'src/app/services/login.service';
import { of } from 'rxjs';
import { User } from 'src/app/models/user';
import { Location } from '@angular/common';
import { MainComponent } from '../main/main.component';

describe('LoginComponent', () => {
  let service: LoginService;
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      imports: [RouterTestingModule.withRoutes([
        { path: 'main', component: MainComponent}
    ]), HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    service = TestBed.inject(LoginService);
    location = TestBed.inject(Location);
    component = fixture.componentInstance;
    fixture.detectChanges();
  
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log in a user', ()=>{
    let user:User = new User({userName:'flodev', passWord:'password', email:'flodev@gmail.com', firstName:'Eric', lastName:'Florence'});

    component.userName = "flodev";
    component.passWord = "password";
    spyOn(service, 'login').and.returnValue(of(user));

    component.login();
    expect(component.user).toEqual(user);
    expect(service.currentUser).toEqual(user);
    expect(location.path()).toBe('');
  });

  it('should sign up a user with valid credentials', ()=>{
    let user:User = new User({userName:'flodev', passWord:'PassW0rd!!', email:'flodev@gmail.com', firstName:'Eric', lastName:'Florence'});

    component.userName = 'flodev';
    component.passWord = 'PassW0rd!!';
    component.email = 'flodev@gmail.com';
    component.firstName = 'Eric';
    component.lastName = 'Florence';

    spyOn(service, 'registerUser').and.returnValue(of(user));
    spyOn(service, 'login').and.returnValue(of(user));

    component.signup();
    expect(component.user).toEqual(user);
    expect(service.currentUser).toEqual(user);
    expect(location.path()).toBe('');
  });

  it('should not sign up a user with invalid password', ()=>{
    let user:User = new User({userName:'flodev', passWord:'PassW0rd!!', email:'flodev@gmail.com', firstName:'Eric', lastName:'Florence'});

    component.userName = 'flodev';
    component.passWord = 'password';
    component.email = 'flodev@gmail.com';
    component.firstName = 'Eric';
    component.lastName = 'Florence';

    spyOn(service, 'registerUser').and.returnValue(of(user));
    spyOn(service, 'login').and.returnValue(of(user));
    spyOn(window, "alert");

    component.signup();
    expect(window.alert).toHaveBeenCalledWith("Password can't have white spaces, must contain one symbol, digit & uppercase letter AND must be 9-16 characters long");
  });

  it('should not sign up a user with invalid email', ()=>{
    let user:User = new User({userName:'flodev', passWord:'PassW0rd!!', email:'flodev@gmail.com', firstName:'Eric', lastName:'Florence'});

    component.userName = 'flodev';
    component.passWord = 'PassW0rd!!';
    component.email = 'flodev';
    component.firstName = 'Eric';
    component.lastName = 'Florence';

    spyOn(service, 'registerUser').and.returnValue(of(user));
    spyOn(service, 'login').and.returnValue(of(user));
    spyOn(window, "alert");

    component.signup();
    expect(window.alert).toHaveBeenCalledWith("Not a valid a email");
  });

  it('should not sign up a user with an empty field', ()=>{
    let user:User = new User({userName:'flodev', passWord:'PassW0rd!!', email:'flodev@gmail.com', firstName:'Eric', lastName:'Florence'});

    component.userName = '';
    component.passWord = 'PassW0rd!!';
    component.email = 'flodev@gmail.com';
    component.firstName = 'Eric';
    component.lastName = 'Florence';

    spyOn(service, 'registerUser').and.returnValue(of(user));
    spyOn(service, 'login').and.returnValue(of(user));
    spyOn(window, "alert");

    component.signup();
    expect(window.alert).toHaveBeenCalledWith("Fields can't be empty");
  });


});
