import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDetailPageItemComponent } from './cart-detail-page-item.component';

describe('CartDetailPageItemComponent', () => {
  let component: CartDetailPageItemComponent;
  let fixture: ComponentFixture<CartDetailPageItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartDetailPageItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartDetailPageItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
