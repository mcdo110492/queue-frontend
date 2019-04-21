import { TestBed } from '@angular/core/testing';

import { AnnouncementsFacadeService } from './announcements-facade.service';

describe('AnnouncementsFacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnnouncementsFacadeService = TestBed.get(AnnouncementsFacadeService);
    expect(service).toBeTruthy();
  });
});
