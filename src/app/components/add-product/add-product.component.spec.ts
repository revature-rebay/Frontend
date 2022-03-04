import { CurrencyPipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

import { AddProductComponent } from './add-product.component';

describe('AddProductComponent', () => {
  
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let mockProductService: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    mockProductService = jasmine.createSpyObj('ProductService', ['addNewProduct', 'updateAllProduct']);
    mockProductService.addNewProduct.and.returnValue(of(true));

    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      declarations: [ AddProductComponent ],
      providers: [ CurrencyPipe, { provide: ProductService, useValue: mockProductService } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new product in the database via the product service', () => {
    component.productName = "test product";
    component.stock = 50;
    component.formattedPriceAmount = 50;
    component.description = "it's a test. what do you want?";
    fixture.detectChanges();

    component.addProduct();
    expect(mockProductService.addNewProduct).toHaveBeenCalled();
    expect(mockProductService.updateAllProducts).toHaveBeenCalled();
  });

});
