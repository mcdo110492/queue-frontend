import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { MediaEffects } from './media.effects';

describe('MediaEffects', () => {
  let actions$: Observable<any>;
  let effects: MediaEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MediaEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(MediaEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
