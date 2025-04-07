import { TestBed } from '@angular/core/testing';

import { ProductStateManegmentService } from './product-state-manegment.service';

describe('ProductStateManegmentService', () => {
  let service: ProductStateManegmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductStateManegmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
