import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedCarouselComponent } from './featured-carousel.component';

describe('FeaturedCarouselComponent', () => {
  let component: FeaturedCarouselComponent;
  let fixture: ComponentFixture<FeaturedCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturedCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
