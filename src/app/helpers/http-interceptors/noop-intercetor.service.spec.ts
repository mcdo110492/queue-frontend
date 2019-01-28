import { TestBed } from '@angular/core/testing';

import { NoopIntercetorService } from './noop-intercetor.service';

describe('NoopIntercetorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NoopIntercetorService = TestBed.get(NoopIntercetorService);
    expect(service).toBeTruthy();
  });
});
