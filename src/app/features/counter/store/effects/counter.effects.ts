import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";

import { CounterActionTypes, AddCounters } from "../actions/counter.actions";
import { switchMap, map, catchError } from "rxjs/operators";
import { CounterService } from "@features/counter/services/counter.service";
import { of } from "rxjs";
import { SnackBarHelperService } from "@helpers/snack-bar-helper/snack-bar-helper.service";

@Injectable()
export class CounterEffects {
  @Effect()
  loadCounters$ = this.actions$.pipe(
    ofType(CounterActionTypes.LOAD_COUNTERS),
    switchMap(() => {
      return this.service.getCounters().pipe(
        map(res => new AddCounters({ counters: res.payload.data })),
        catchError(err => {
          this.snackBar.snackError(err.status);
          return of();
        })
      );
    })
  );

  constructor(
    private actions$: Actions,
    private service: CounterService,
    private snackBar: SnackBarHelperService
  ) {}
}
