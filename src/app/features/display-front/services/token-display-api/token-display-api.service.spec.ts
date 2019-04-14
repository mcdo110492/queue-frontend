import { TestBed } from '@angular/core/testing';

import { TokenDisplayApiService } from './token-display-api.service';

describe('TokenDisplayApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TokenDisplayApiService = TestBed.get(TokenDisplayApiService);
    expect(service).toBeTruthy();
  });
});
