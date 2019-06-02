import { TestBed } from '@angular/core/testing';

import { TokenListLocalService } from './token-list-local.service';

describe('TokenListLocalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TokenListLocalService = TestBed.get(TokenListLocalService);
    expect(service).toBeTruthy();
  });
});
