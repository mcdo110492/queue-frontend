import { TestBed } from '@angular/core/testing';

import { TokenListService } from './token-list.service';

describe('TokenListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TokenListService = TestBed.get(TokenListService);
    expect(service).toBeTruthy();
  });
});
