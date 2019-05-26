import { TestBed } from '@angular/core/testing';

import { UserManagementFormConfigService } from './user-management-form-config.service';

describe('UserManagementFormConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserManagementFormConfigService = TestBed.get(UserManagementFormConfigService);
    expect(service).toBeTruthy();
  });
});
