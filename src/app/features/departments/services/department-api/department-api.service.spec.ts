import { TestBed } from '@angular/core/testing';

import { DepartmentApiService } from './department-api.service';

describe('DepartmentApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DepartmentApiService = TestBed.get(DepartmentApiService);
    expect(service).toBeTruthy();
  });
});
