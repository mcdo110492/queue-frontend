import { TestBed } from '@angular/core/testing';

import { MediaFormConfigService } from './media-form-config.service';

describe('MediaFormConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MediaFormConfigService = TestBed.get(MediaFormConfigService);
    expect(service).toBeTruthy();
  });
});
