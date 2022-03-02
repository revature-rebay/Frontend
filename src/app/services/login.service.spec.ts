import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { User } from '../models/user';
import { LoginService } from './login.service';


describe('LoginService', () => {
  /*
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
    
    let user:User = new User({userName:'flodev', passWord:'password', email:'flodev@gmail.com', firstName:'Eric', lastName:'Florence'});

    service.registerUser(user).subscribe((testUser) =>{
      expect(testUser).toEqual(user);
    })

    const req = httpMock.expectOne(`${service.url}user`);

    expect(req.request.method).toBe("POST");

    req.flush(user);

    httpMock.verify();

  })

  it('should return a cookie and the user', ()=>{

    let user:User = new User({id:1, userName:'flodev', passWord:'password', email:'flodev@gmail.com', firstName:'Eric', lastName:'Florence', roleId:2});
    let loginUser:User = new User();
    loginUser.userName = 'flodev';
    loginUser.passWord = 'password';

    service.login(loginUser).subscribe((testUser) =>{
      expect(testUser).toEqual(user);
    });

    const req = httpMock.expectOne(`${service.url}user/login`);

    expect(req.request.method).toBe("POST");

    req.flush(user);

    httpMock.verify();

  })

  it('should return status 200 for loggin out', ()=>{

    let response:number = 200;

    service.logout().subscribe((status) =>{
      expect(status).toEqual(response);
    })

    const req = httpMock.expectOne(`${service.url}user/logout`);

    expect(req.request.method).toBe("POST");

    req.flush(response);

    httpMock.verify();

  })


  // BELONGED TO ORIGINAL REQUEST FOR GET CURRENT USER, FOR USE LATER IF NEEDED
  // it('should return the user who is currently logged in', ()=>{

  //   let user:User = new User();

  //   spyOn(service, 'getCurrentUser').and.returnValue(of(user));

  //   service.getCurrentUser().subscribe((response)=>{
  //     expect(response).toEqual(user);
  //   })
  //   expect(service.getCurrentUser).toHaveBeenCalled;

  // })

  it('should return a user matching an id', ()=>{

    let user:User = new User({id:1, userName:'flodev', passWord:'password', email:'flodev@gmail.com', firstName:'Eric', lastName:'Florence'});

    service.getUserById(1).subscribe((testUser) =>{
      expect(user).toEqual(testUser);
    })

    const req = httpMock.expectOne(`${service.url}user/1`);

    expect(req.request.method).toBe("GET");

    req.flush(user);

    httpMock.verify();

  })
*/

});
