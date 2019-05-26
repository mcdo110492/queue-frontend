import { TestBed } from '@angular/core/testing';

import { DepartmentFormConfigService } from './department-form-config.service';

describe('DepartmentFormConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DepartmentFormConfigService = TestBed.get(DepartmentFormConfigService);
    expect(service).toBeTruthy();
  });
});
