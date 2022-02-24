import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductModel } from './product.model';

describe('ProductModel', () => {
  let component: ProductModel;
  let fixture: ComponentFixture<ProductModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductModel ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductModel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
