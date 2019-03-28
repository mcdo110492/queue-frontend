import { Injectable } from "@angular/core";

import { Actions, Effect, ofType } from "@ngrx/effects";

import { RemoveNowServing, NowServingActionTypes } from "./now-serving.actions";
import { map } from "rxjs/operators";

@Injectable()
export class NowServingEffects {
  constructor(private actions$: Actions) {}
}
