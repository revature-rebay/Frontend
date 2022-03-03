import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { Product } from 'src/app/models/product/product.model';
import { ProductService } from 'src/app/services/product.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductDetailsPageComponent } from './product-details-page.component';
import { By } from '@angular/platform-browser';

fdescribe('ProductDetailsPageComponent', () => {
  let component: ProductDetailsPageComponent;
  let fixture: ComponentFixture<ProductDetailsPageComponent>;
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      declarations: [ ProductDetailsPageComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule ]
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

  it('should check if the displayed product is featured', () => {
      component.displayProduct = new Product(1, "Black Hat", "It's...a black hat", 15, 10, true, 50);
      expect(component.isFeatured()).toBeTrue();
  });

  it('should tell if the currently displayed product is featured', () => {
    //featured product
    component.displayProduct = new Product(0, "", "", 0, 0, true, 0);
    expect(component.isFeatured()).toBeTrue();
    //not featured product
    component.displayProduct = new Product(0, "", "", 0, 0, false, 0);
    expect(component.isFeatured()).toBeFalse();
  });

  it('should display product fields on the webpage', () => {
    component.displayProduct = new Product(0, "Black Hat", "It's...a black hat", 15, 10, true, 50);
    fixture.detectChanges();

    const nameElement: HTMLHeadingElement = fixture.debugElement.nativeElement.querySelector('#productName');
    expect(nameElement.textContent).toEqual(component.displayProduct.productName);
    const descriptionElement: HTMLHeadingElement = fixture.debugElement.nativeElement.querySelector('#productDescription');
    expect(descriptionElement.textContent).toEqual(component.displayProduct.productDescription);
    const featured = fixture.debugElement.query(By.css('#featuredProduct'));
    expect(featured).toBeTruthy();
    const sale = fixture.debugElement.query(By.css('#onSale'));
    expect(sale).toBeTruthy();
    const noSale = fixture.debugElement.query(By.css('#fullPrice'));
    expect(noSale).toBeFalsy();
    
  })
  
});
