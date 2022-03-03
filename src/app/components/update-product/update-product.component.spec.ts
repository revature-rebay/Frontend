import { CurrencyPipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Product } from 'src/app/models/product/product.model';
import { ProductService } from 'src/app/services/product.service';

import { UpdateProductComponent } from './update-product.component';

describe('UpdateProductComponent', () => {
  let component: UpdateProductComponent;
  let fixture: ComponentFixture<UpdateProductComponent>;
  let mockProductService: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    mockProductService = jasmine.createSpyObj('ProductService', ['updateProduct', 'updateAllProduct']);
    mockProductService.updateProduct.and.returnValue(of(true));

    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      declarations: [ UpdateProductComponent ],
      providers: [ CurrencyPipe, { provide: ProductService, useValue: mockProductService } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update a product in the database via the product service', () => {
    component.product = new Product(1, "Black Hat", "It's...a black hat", 15, 10, true, 50);
    fixture.detectChanges();

    component.productUpdated();
    expect(mockProductService.updateProduct).toHaveBeenCalled();
  });

});
