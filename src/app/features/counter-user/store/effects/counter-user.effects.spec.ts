import { TestBed, inject } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Observable } from "rxjs";

import { CounterUserEffects } from "./counter-user.effects";

describe("CounterEffects", () => {
  let actions$: Observable<any>;
  let effects: CounterUserEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CounterUserEffects, provideMockActions(() => actions$)]
    });

    effects = TestBed.get(CounterUserEffects);
  });

  it("should be created", () => {
    expect(effects).toBeTruthy();
  });
});
