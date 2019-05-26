import { TestBed } from '@angular/core/testing';

import { DeparmentsFacadeService } from './deparments-facade.service';

describe('DeparmentsFacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeparmentsFacadeService = TestBed.get(DeparmentsFacadeService);
    expect(service).toBeTruthy();
  });
});
