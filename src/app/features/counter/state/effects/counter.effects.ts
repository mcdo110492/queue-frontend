import { Injectable } from "@angular/core";

import { Actions, Effect, ofType } from "@ngrx/effects";

import { MatDialog } from "@angular/material/dialog";

import { of } from "rxjs";
import { switchMap, map, catchError, concatMap } from "rxjs/operators";

import { CounterService } from "@features/counter/services/counter-api/counter.service";

import { SnackBarService } from "@core/services/snack-bar/snack-bar.service";

import {
  CounterActionTypes,
  AddCounters,
  CreateNewCounterModel,
  AddCounter,
  OnServerError,
  UpdateCounterModel,
  UpdateCounter
} from "../actions/counter.actions";

@Injectable()
export class CounterEffects {
  @Effect()
  loadCounters$ = this.actions$.pipe(
    ofType(CounterActionTypes.LOAD_COUNTERS),
    switchMap(() => {
      return this.service.getCounters().pipe(
        map(res => new AddCounters({ counters: res.payload.data })),
        catchError(err => {
          this.snackBar.globalSnackBarError(err.status);
          return of();
        })
      );
    })
  );

  @Effect()
  createCounter$ = this.actions$.pipe(
    ofType<CreateNewCounterModel>(CounterActionTypes.CREATE_NEW_COUNTER_MODEL),
    map(action => action.payload),
    concatMap(payload => {
      return this.service.create(payload).pipe(
        map(res => new AddCounter({ counter: res.payload.data })),
        catchError(err => of(new OnServerError(err)))
      );
    })
  );

  @Effect({ dispatch: false })
  addCounter$ = this.actions$.pipe(
    ofType(CounterActionTypes.ADD_COUNTER),
    map(() => {
      this.snackBar.customSnackBar("success", "Saved", "OK");
      this.dialog.getDialogById("counter-form-dialog").close();
    })
  );

  @Effect()
  updateCounterModel$ = this.actions$.pipe(
    ofType<UpdateCounterModel>(CounterActionTypes.UPDATE_COUNTER_MODEL),
    map(action => action.payload),
    concatMap(payload => {
      return this.service.update(payload).pipe(
        map(
          res =>
            new UpdateCounter({
              counter: { id: res.payload.data.id, changes: res.payload.data }
            })
        ),
        catchError(err => of(new OnServerError(err)))
      );
    })
  );

  @Effect({ dispatch: false })
  updateCounter = this.actions$.pipe(
    ofType(CounterActionTypes.UPDATE_COUNTER),
    map(() => {
      this.snackBar.customSnackBar("success", "Updated", "OK");
      this.dialog.getDialogById("counter-form-dialog").close();
    })
  );

  @Effect({ dispatch: false })
  onServerErr$ = this.actions$.pipe(
    ofType<OnServerError>(CounterActionTypes.ON_SERVER_ERROR),
    map(action => {
      this.snackBar.globalSnackBarError(action.payload.status);
    })
  );

  constructor(
    private actions$: Actions,
    private service: CounterService,
    private snackBar: SnackBarService,
    private dialog: MatDialog
  ) {}
}
