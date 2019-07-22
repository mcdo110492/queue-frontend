import { TestBed } from '@angular/core/testing';

import { ReportsFacadeService } from './reports-facade.service';

describe('ReportsFacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReportsFacadeService = TestBed.get(ReportsFacadeService);
    expect(service).toBeTruthy();
  });
});
