import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Product } from 'src/app/models/product/product.model';
import { ProductService } from 'src/app/services/product.service';
import { SearchResultsComponent } from './search-results.component';

fdescribe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;
  let mockProductService: jasmine.SpyObj<ProductService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let allProducts: Product[] = [];

  beforeEach(async () => {
    mockProductService = jasmine.createSpyObj('ProductService', ['exists', 'getAllProducts']);
    mockProductService.exists.withArgs(1).and.returnValue(true);
    mockProductService.exists.withArgs(-1).and.returnValue(false);
    mockProductService.getAllProducts.and.returnValue(of(allProducts));
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    
    await TestBed.configureTestingModule({
      declarations: [ SearchResultsComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [ { provide: ProductService, useValue: mockProductService }, { provide: Router, useValue: mockRouter }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the Product Details page if the product exists', () => {
    component.getDetails(1);
    component.getDetails(-1);
    
    expect(mockProductService.exists).toHaveBeenCalledTimes(2);
    expect(mockRouter.navigate).toHaveBeenCalledTimes(1);
  })
});
