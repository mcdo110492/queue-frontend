import { TestBed } from '@angular/core/testing';

import { CounterUserApiService } from './counter-user-api.service';

describe('CounterUserApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CounterUserApiService = TestBed.get(CounterUserApiService);
    expect(service).toBeTruthy();
  });
});
