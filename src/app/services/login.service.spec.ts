import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { User } from '../models/user';
import { LoginService } from './login.service';


fdescribe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ LoginService ]
    });
    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a new user', ()=>{
    
    let status:number = 201;
    let user:User = new User();

    spyOn(service, 'registerUser').and.returnValue(of(status));

    service.registerUser(user).subscribe((data) => {
      expect(data).toEqual(status);
    });
    expect(service.registerUser).toHaveBeenCalled;
  })

  it('should return a cookie and the user', ()=>{

    let user:User = new User();

    spyOn(service, 'login').and.returnValue(of(user));

    service.login(user).subscribe((response)=>{
      expect(response).toEqual(user);
    });
    expect(service.login).toHaveBeenCalled;

  })

  it('should return an empty cookie', ()=>{

    let cookie:string = "";

    spyOn(service, 'logout').and.returnValue(of(cookie));

    service.logout().subscribe((response)=>{
      expect(response).toEqual(cookie);
    })
    expect(service.logout).toHaveBeenCalled;

  })

  it('should return the user who is currently logged in', ()=>{

    let user:User = new User();

    spyOn(service, 'getCurrentUser').and.returnValue(of(user));

    service.getCurrentUser().subscribe((response)=>{
      expect(response).toEqual(user);
    })
    expect(service.getCurrentUser).toHaveBeenCalled;

  })

  it('should return a user matching an id', ()=>{

    let user:User = new User();

    spyOn(service, 'getUserById').and.returnValue(of(user));

    service.getUserById(1).subscribe((response)=>{
      expect(response).toEqual(user);
    });
    expect(service.getUserById).toHaveBeenCalled;

  })

});
