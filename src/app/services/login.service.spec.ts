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



});
