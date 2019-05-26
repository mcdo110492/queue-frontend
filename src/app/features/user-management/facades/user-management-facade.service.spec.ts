import { TestBed } from '@angular/core/testing';

import { UserManagementFacadeService } from './user-management-facade.service';

describe('UserManagementFacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserManagementFacadeService = TestBed.get(UserManagementFacadeService);
    expect(service).toBeTruthy();
  });
});
