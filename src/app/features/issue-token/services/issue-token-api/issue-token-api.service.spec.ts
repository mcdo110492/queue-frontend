import { TestBed } from '@angular/core/testing';

import { IssueTokenApiService } from './issue-token-api.service';

describe('IssueTokenApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IssueTokenApiService = TestBed.get(IssueTokenApiService);
    expect(service).toBeTruthy();
  });
});
