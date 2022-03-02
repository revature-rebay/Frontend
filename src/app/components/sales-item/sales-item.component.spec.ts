import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SalesItemComponent } from './sales-item.component';

describe('SalesItemComponent', () => {
  let component: SalesItemComponent;
  let fixture: ComponentFixture<SalesItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
<<<<<<< HEAD
      imports: [ HttpClientTestingModule ],
=======
      // declarations: [ ProductPageComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
>>>>>>> c0cbb2b4f10fd2b6f7a99738441336efcc26dac4
      declarations: [ SalesItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
