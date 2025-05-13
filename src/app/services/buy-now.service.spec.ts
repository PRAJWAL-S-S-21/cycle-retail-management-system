import { TestBed } from '@angular/core/testing';

import { BuyNowService } from './buy-now.service';

describe('BuyNowService', () => {
  let service: BuyNowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyNowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
