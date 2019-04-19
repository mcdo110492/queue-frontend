import { TestBed } from '@angular/core/testing';

import { NotificationSoundService } from './notification-sound.service';

describe('NotificationSoundService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificationSoundService = TestBed.get(NotificationSoundService);
    expect(service).toBeTruthy();
  });
});
