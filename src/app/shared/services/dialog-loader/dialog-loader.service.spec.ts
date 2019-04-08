import { TestBed } from '@angular/core/testing';

import { DialogLoaderService } from './dialog-loader.service';

describe('DialogLoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DialogLoaderService = TestBed.get(DialogLoaderService);
    expect(service).toBeTruthy();
  });
});
