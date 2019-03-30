import { TestBed } from '@angular/core/testing';

import { IssueTokenFacadeService } from './issue-token-facade.service';

describe('IssueTokenFacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IssueTokenFacadeService = TestBed.get(IssueTokenFacadeService);
    expect(service).toBeTruthy();
  });
});
