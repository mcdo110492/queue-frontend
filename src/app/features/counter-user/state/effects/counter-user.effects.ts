import { Injectable } from "@angular/core";

import { Actions, Effect, ofType } from "@ngrx/effects";

import { MatDialog } from "@angular/material/dialog";

import { of } from "rxjs";
import { switchMap, map, catchError, concatMap } from "rxjs/operators";

import { SnackBarService } from "@core/services/snack-bar/snack-bar.service";
import { CounterUserApiService } from "@features/counter-user/services/counter-user-api/counter-user-api.service";

import {
  CounterUserActionTypes,
  AddCounterUsers,
  CreateNewCounterUserModel,
  AddCounterUser,
  OnServerError,
  UpdateCounterUser,
  UpdateCounterUserModel,
  AddCounterOptions,
  AddUserOptions
} from "../actions/counter-user.actions";

@Injectable()
export class CounterUserEffects {
  @Effect()
  loadCounters$ = this.actions$.pipe(
    ofType(CounterUserActionTypes.LOAD_COUNTER_USERS),
    switchMap(() => {
      return this.service.getCounters().pipe(
        map(res => new AddCounterUsers({ counters: res.payload.data })),
        catchError(err => {
          this.snackBar.globalSnackBarError(err.status);
          return of();
        })
      );
    })
  );

  @Effect()
  createCounter$ = this.actions$.pipe(
    ofType<CreateNewCounterUserModel>(
      CounterUserActionTypes.CREATE_NEW_COUNTER_USER_MODEL
    ),
    map(action => action.payload),
    concatMap(payload => {
      return this.service.create(payload).pipe(
        map(res => new AddCounterUser({ counter: res.payload.data })),
        catchError(err => of(new OnServerError(err)))
      );
    })
  );

  @Effect({ dispatch: false })
  addCounter$ = this.actions$.pipe(
    ofType(CounterUserActionTypes.ADD_COUNTER_USER),
    map(() => {
      this.snackBar.customSnackBar("success", "Saved", "OK");
      this.dialog.getDialogById("counter-user-form-dialog").close();
    })
  );

  @Effect()
  updateCounterModel$ = this.actions$.pipe(
    ofType<UpdateCounterUserModel>(
      CounterUserActionTypes.UPDATE_COUNTER_USER_MODEL
    ),
    map(action => action.payload),
    concatMap(payload => {
      return this.service.update(payload).pipe(
        map(
          res =>
            new UpdateCounterUser({
              counter: { id: res.payload.data.id, changes: res.payload.data }
            })
        ),
        catchError(err => of(new OnServerError(err)))
      );
    })
  );

  @Effect({ dispatch: false })
  updateCounter = this.actions$.pipe(
    ofType(CounterUserActionTypes.UPDATE_COUNTER_USER),
    map(() => {
      this.snackBar.customSnackBar("success", "Updated", "OK");
      this.dialog.getDialogById("counter-user-form-dialog").close();
    })
  );

  @Effect()
  loadCounterOptions = this.actions$.pipe(
    ofType(CounterUserActionTypes.LOAD_COUNTERS_OPTIONS),
    switchMap(() => {
      return this.service.loadCounters().pipe(
        map(resp => new AddCounterOptions(resp)),
        catchError(err => of(new OnServerError(err)))
      );
    })
  );

  @Effect()
  loadUserOptions = this.actions$.pipe(
    ofType(CounterUserActionTypes.LOAD_USERS_OPTIONS),
    switchMap(() => {
      return this.service.loadUsers().pipe(
        map(resp => new AddUserOptions(resp)),
        catchError(err => of(new OnServerError(err)))
      );
    })
  );

  @Effect({ dispatch: false })
  onServerErr$ = this.actions$.pipe(
    ofType<OnServerError>(CounterUserActionTypes.ON_SERVER_ERROR),
    map(action => {
      this.snackBar.globalSnackBarError(action.payload.status);
    })
  );

  constructor(
    private actions$: Actions,
    private service: CounterUserApiService,
    private snackBar: SnackBarService,
    private dialog: MatDialog
  ) {}
}
