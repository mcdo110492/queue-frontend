import { TestBed } from '@angular/core/testing';

import { SidebarlinkService } from './sidebarlink.service';

describe('SidebarlinkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SidebarlinkService = TestBed.get(SidebarlinkService);
    expect(service).toBeTruthy();
  });
});
