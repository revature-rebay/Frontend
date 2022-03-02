import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Product } from 'src/app/models/product/product.model';
import { ProductService } from 'src/app/services/product.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductDetailsPageComponent } from './product-details-page.component';

fdescribe('ProductDetailsPageComponent', () => {
  let component: ProductDetailsPageComponent;
  let fixture: ComponentFixture<ProductDetailsPageComponent>;
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      declarations: [ ProductDetailsPageComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should tell if the currently displayed product is discounted', () => {
    //on sale product
    component.displayProduct = new Product(0, "", "", 0, 10, false, 0);
    expect(component.onSale).toEqual(true);
    //full price product
    component.displayProduct = new Product(0, "", "", 0, 0, false, 0);
    expect(component.onSale).toEqual(false);
  })

  it('should tell if the currently displayed product is featured', () => {
    //featured product
    component.displayProduct = new Product(0, "", "", 0, 0, true, 0);
    expect(component.displayProduct.featuredProduct).toEqual(true);
    //not featured product
    component.displayProduct = new Product(0, "", "", 0, 0, false, 0);
    expect(component.displayProduct.featuredProduct).toEqual(false);
  })
/*
  it('should display product fields on the webpage', () => {

  })
  */
});
