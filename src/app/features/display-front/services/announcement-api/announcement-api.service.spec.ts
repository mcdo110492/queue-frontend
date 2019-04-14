import { TestBed } from '@angular/core/testing';

import { AnnouncementApiService } from './announcement-api.service';

describe('AnnouncementApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnnouncementApiService = TestBed.get(AnnouncementApiService);
    expect(service).toBeTruthy();
  });
});
