import { TestBed } from '@angular/core/testing';

import { UserManagementApiService } from './user-management-api.service';

describe('UserManagementApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserManagementApiService = TestBed.get(UserManagementApiService);
    expect(service).toBeTruthy();
  });
});
