import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPanelContentComponent } from './cart-panel-content.component';

describe('CartPanelContentComponent', () => {
  let component: CartPanelContentComponent;
  let fixture: ComponentFixture<CartPanelContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartPanelContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartPanelContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
