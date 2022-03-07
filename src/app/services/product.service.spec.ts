import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product/product.model';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';

fdescribe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ ProductService ]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('should return a full list of products', () => {
    let products: Product[] = [];

    let http = httpMock.expectOne(req => req.url.startsWith('http://localhost:9000/products'));
    expect(http.request.method).toEqual('GET');
    service.getAllProducts().subscribe(response => {
      expect(response).toEqual(products);
      expect(response.length).toEqual(0);
    })

    http.flush(products);
  })

  it('should return a list of featured products', () => {
    let products: Product[] = [];

    service.getFeaturedProducts().subscribe(response => {
      expect(response).toEqual(products);
      expect(response.length).toEqual(0);
    })
    let http = httpMock.expectOne(req => req.url.startsWith('http://localhost:9000/products/featured'));
    expect(http.request.method).toEqual('GET');

    http.flush(products);
  })

  it('should return a list of discounted products', () => {
    let products: Product[] = [];
    
    service.getDiscountedProducts().subscribe(response => {
      expect(response).toEqual(products);
      expect(response.length).toEqual(0);
    })
    let http = httpMock.expectOne(req => req.url.startsWith('http://localhost:9000/products/clearance'));
    expect(http.request.method).toEqual('GET');

    http.flush(products);
  })

  it('should add a product to the database', () => {
    let product: Product = new Product(0, "", "", 0, 0, false, 0);
    
    service.addNewProduct(product).subscribe(response => {
      expect(response).toEqual(true);
    })
    
    let http = httpMock.expectOne(req => 
      req.url.startsWith('http://localhost:9000/products/add')
    );
    expect(http.request.method).toEqual('POST');

    http.flush(true);
  })

  it('should remove a product from the database', () => {
    service.removeProduct(1).subscribe(response => {
      expect(response).toEqual(true);
    })
    
    let http = httpMock.expectOne(req => 
      req.urlWithParams.startsWith('http://localhost:9000/products/remove')
    );
    expect(http.request.method).toEqual('DELETE');

    http.flush(true);
  })

  fit('should update product data in the database', () => {
    let product: Product = new Product(0, "", "", 0, 0, false, 0);

    service.updateProduct(product).subscribe(response => {
      expect(response).toEqual(true);
    })
    
    let http = httpMock.expectOne(req => 
      req.urlWithParams.startsWith('http://localhost:9000/products/update')
    );
    expect(http.request.method).toEqual('PUT');

    http.flush(true);
  })

});