import { TestBed } from '@angular/core/testing';

import { MediaFacadeService } from './media-facade.service';

describe('MediaFacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MediaFacadeService = TestBed.get(MediaFacadeService);
    expect(service).toBeTruthy();
  });
});
