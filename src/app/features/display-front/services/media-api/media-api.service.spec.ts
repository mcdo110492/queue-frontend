import { TestBed } from '@angular/core/testing';

import { MediaApiService } from './media-api.service';

describe('MediaApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MediaApiService = TestBed.get(MediaApiService);
    expect(service).toBeTruthy();
  });
});
