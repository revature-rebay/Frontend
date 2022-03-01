import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDetailPageComponent } from './cart-detail-page.component';

describe('CartDetailPageComponent', () => {
  let component: CartDetailPageComponent;
  let fixture: ComponentFixture<CartDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartDetailPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
