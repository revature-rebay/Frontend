import { TestBed } from '@angular/core/testing';

import { MonitorCartService } from './monitor-cart.service';

describe('MonitorCartService', () => {
  let service: MonitorCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonitorCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
