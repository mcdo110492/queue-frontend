import { TestBed } from '@angular/core/testing';

import { CounterUserFormConfigService } from './counter-user-form-config.service';

describe('CounterUserFormConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CounterUserFormConfigService = TestBed.get(CounterUserFormConfigService);
    expect(service).toBeTruthy();
  });
});
