import { TestBed } from '@angular/core/testing';

import { CounterFormConfigService } from './counter-form-config.service';

describe('CounterFormConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CounterFormConfigService = TestBed.get(CounterFormConfigService);
    expect(service).toBeTruthy();
  });
});
