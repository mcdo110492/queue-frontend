import { TestBed } from '@angular/core/testing';

import { MyCounterTimerService } from './my-counter-timer.service';

describe('MyCounterTimerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyCounterTimerService = TestBed.get(MyCounterTimerService);
    expect(service).toBeTruthy();
  });
});
