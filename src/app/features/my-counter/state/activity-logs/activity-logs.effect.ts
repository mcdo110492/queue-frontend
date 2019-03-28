import { Injectable } from "@angular/core";

import { Actions, Effect, ofType } from "@ngrx/effects";

import { of } from "rxjs";
import { switchMap, map, catchError } from "rxjs/operators";

import { MyCounterApiService } from "@features/my-counter/services/my-counter-api.service";

import { SnackBarService } from "@core/services/snack-bar/snack-bar.service";

import {
  ActivityLogActionTypes,
  OnServerError,
  AddActivityLogs
} from "./activity-logs.actions";

@Injectable()
export class ActivityLogsEffects {
  @Effect()
  loadActivityLogs$ = this.actions$.pipe(
    ofType(ActivityLogActionTypes.LOAD_ACTIVITY_LOGS),
    switchMap(() => {
      return this.service.getUserLogs().pipe(
        map(res => new AddActivityLogs({ logs: res.payload.data })),
        catchError(err => {
          this.snackBar.globalSnackBarError(err.status);
          return of();
        })
      );
    })
  );

  @Effect({ dispatch: false })
  onServerErr$ = this.actions$.pipe(
    ofType<OnServerError>(ActivityLogActionTypes.ON_SERVER_ERROR),
    map(action => {
      this.snackBar.globalSnackBarError(action.payload);
    })
  );

  constructor(
    private actions$: Actions,
    private service: MyCounterApiService,
    private snackBar: SnackBarService
  ) {}
}
