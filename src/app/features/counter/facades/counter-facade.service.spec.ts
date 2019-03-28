import { TestBed } from '@angular/core/testing';

import { CounterFacadeService } from './counter-facade.service';

describe('CounterFacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CounterFacadeService = TestBed.get(CounterFacadeService);
    expect(service).toBeTruthy();
  });
});
