import { TestBed } from '@angular/core/testing';

import { SnackBarHelperService } from './snack-bar-helper.service';

describe('SnackBarHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SnackBarHelperService = TestBed.get(SnackBarHelperService);
    expect(service).toBeTruthy();
  });
});
