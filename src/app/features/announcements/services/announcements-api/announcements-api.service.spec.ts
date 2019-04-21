import { TestBed } from '@angular/core/testing';

import { AnnouncementsApiService } from './announcements-api.service';

describe('AnnouncementsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnnouncementsApiService = TestBed.get(AnnouncementsApiService);
    expect(service).toBeTruthy();
  });
});
