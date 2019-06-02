import { TestBed } from '@angular/core/testing';

import { TokenListFacadeService } from './token-list-facade.service';

describe('TokenListFacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TokenListFacadeService = TestBed.get(TokenListFacadeService);
    expect(service).toBeTruthy();
  });
});
