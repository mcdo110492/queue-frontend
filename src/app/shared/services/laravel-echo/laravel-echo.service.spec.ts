import { TestBed } from '@angular/core/testing';

import { LaravelEchoService } from './laravel-echo.service';

describe('LaravelEchoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LaravelEchoService = TestBed.get(LaravelEchoService);
    expect(service).toBeTruthy();
  });
});
