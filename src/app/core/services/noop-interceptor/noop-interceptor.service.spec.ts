import { TestBed } from '@angular/core/testing';

import { NoopInterceptorService } from './noop-interceptor.service';

describe('NoopInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NoopInterceptorService = TestBed.get(NoopInterceptorService);
    expect(service).toBeTruthy();
  });
});
