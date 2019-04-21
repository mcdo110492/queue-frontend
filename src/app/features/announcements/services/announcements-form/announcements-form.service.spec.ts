import { TestBed } from '@angular/core/testing';

import { AnnouncementsFormService } from './announcements-form.service';

describe('AnnouncementsFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnnouncementsFormService = TestBed.get(AnnouncementsFormService);
    expect(service).toBeTruthy();
  });
});
