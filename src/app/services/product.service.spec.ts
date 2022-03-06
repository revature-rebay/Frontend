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

  it('should add a product to the database', () => {
    let rejectedProduct: Product = new Product(1, "", "", 0, 0, false, 0);
    let acceptedProduct: Product = new Product(0, "", "", 0, 0, false, 0);
    let productServiceMock1 = spyOn(service, 'addNewProduct').withArgs(acceptedProduct)
      .and.returnValue(of(true));

    service.addNewProduct(acceptedProduct).subscribe((data) => {
      console.log("Success test called")
      expect(data).toEqual(true);
    });
    /*
    service.addNewProduct(rejectedProduct).subscribe((data) => {
      console.log("Failure test called")
      expect(data).toEqual(false);
    });
*/
  })

  it('should remove a product from the database', () => {
    let productServiceMock1 = spyOn(service, 'removeProduct').withArgs(1)
      .and.returnValue(of(true));

    // let productServiceMock2 = spyOn(service, 'removeProduct').withArgs(-1)
    //   .and.returnValue(of(false));

    service.removeProduct(1).subscribe((data) => {
      console.log("Success test called")
      expect(data).toEqual(true);
    });

    // service.removeProduct(-1).subscribe((data) => {
    //   console.log("Failure test called")
    //   expect(data).toEqual(false);
    // });

    expect(service.removeProduct).toHaveBeenCalled();
  })

  it('should update product data in the database', () => {
    let rejectedProduct: Product = new Product(0, "", "", 0, 0, false, 0);
    let acceptedProduct: Product = new Product(1, "", "", 0, 0, false, 0);
    let productServiceMock1 = spyOn(service, 'updateProduct').withArgs(acceptedProduct)
      .and.returnValue(of(true));
    
    // let productServiceMock2 = spyOn(service, 'updateProduct').withArgs(rejectedProduct)
    //   .and.returnValue(of(false));

    service.updateProduct(acceptedProduct).subscribe((data) => {
      console.log("called")
      expect(data).toEqual(true);
    });
    // service.updateProduct(rejectedProduct).subscribe((data) => {
    //   console.log("called")
    //   expect(data).toEqual(false);
    // });

    expect(service.updateProduct).toHaveBeenCalled();
  })

});