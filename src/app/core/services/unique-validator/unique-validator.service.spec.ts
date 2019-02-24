import { TestBed } from '@angular/core/testing';

import { UniqueValidatorService } from './unique-validator.service';

describe('UniqueValidatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UniqueValidatorService = TestBed.get(UniqueValidatorService);
    expect(service).toBeTruthy();
  });
});
