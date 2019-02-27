import { TestBed } from '@angular/core/testing';

import { MyCounterApiService } from './my-counter-api.service';

describe('MyCounterApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyCounterApiService = TestBed.get(MyCounterApiService);
    expect(service).toBeTruthy();
  });
});
