import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product/product.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ ProductService ]
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a full list of products', () => {
    let products: Product[] = [];
    let productServiceMock = spyOn(service, 'getAllProducts').withArgs()
      .and.returnValue(of(products));

    service.getAllProducts().subscribe((data) => {
      console.log("called")
      expect(data).toEqual(products);
    }); 
    expect(service.getAllProducts).toHaveBeenCalled();
  })

  it('should return a list of featured products', () => {
    let products: Product[] = [];
    let productServiceMock = spyOn(service, 'getFeaturedProducts').withArgs()
      .and.returnValue(of(products));

    service.getFeaturedProducts().subscribe((data) => {
      console.log("called")
      expect(data).toEqual(products);
    }); 
    expect(service.getFeaturedProducts).toHaveBeenCalled();
  })

  it('should return a list of discounted products', () => {
    let products: Product[] = [];
    let productServiceMock = spyOn(service, 'getDiscountedProducts').withArgs()
      .and.returnValue(of(products));

    service.getDiscountedProducts().subscribe((data) => {
      console.log("called")
      expect(data).toEqual(products);
    }); 
    expect(service.getDiscountedProducts).toHaveBeenCalled();
  })

});