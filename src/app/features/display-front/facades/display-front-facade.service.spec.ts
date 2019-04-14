import { TestBed } from '@angular/core/testing';

import { DisplayFrontFacadeService } from './display-front-facade.service';

describe('DisplayFrontFacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DisplayFrontFacadeService = TestBed.get(DisplayFrontFacadeService);
    expect(service).toBeTruthy();
  });
});
