import { TestBed } from '@angular/core/testing';

import { CycleTypeService } from './cycle-type.service';

describe('CycleTypeService', () => {
  let service: CycleTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CycleTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
