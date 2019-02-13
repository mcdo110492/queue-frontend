import { TestBed } from '@angular/core/testing';

import { QueueFrontDisplayApiService } from './queue-front-display-api.service';

describe('QueueFrontDisplayApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QueueFrontDisplayApiService = TestBed.get(QueueFrontDisplayApiService);
    expect(service).toBeTruthy();
  });
});
