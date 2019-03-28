import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";

import { of } from "rxjs";
import { switchMap, map, catchError, withLatestFrom } from "rxjs/operators";

import { MyCounterApiService } from "@features/my-counter/services";
import { SnackBarService } from "@core/services/snack-bar/snack-bar.service";

import {
  QueuePriorityActionTypes,
  OnServerError,
  AddQueuePriorities,
  CallPriority,
  RemoveQueuePriority,
  BackToPriority,
  AddQueuePriority
} from "./queue-priority.actions";

import {
  AddNowServing,
  RemoveNowServing
} from "../now-serving/now-serving.actions";

import * as fromNowServingSelectors from "../now-serving/now-serving.selector";
import * as fromNowServingState from "../now-serving/now-serving.reducer";

@Injectable()
export class QueuePriorityEffects {
  @Effect()
  loadQueuesPriorities$ = this.actions$.pipe(
    ofType(QueuePriorityActionTypes.LOAD_QUEUE_PRIORITIES),
    switchMap(() => {
      return this.service.getNowPending(1).pipe(
        map(
          resp => new AddQueuePriorities({ queuePriorities: resp.payload.data })
        ),
        catchError(err => of(new OnServerError(err)))
      );
    })
  );

  @Effect()
  callPriority$ = this.actions$.pipe(
    ofType<CallPriority>(QueuePriorityActionTypes.CALL_PRIORITY),
    withLatestFrom(
      this.nowServingStore.select(fromNowServingSelectors.selectedNowServingId)
    ),
    switchMap(([action, nowServingId]) => {
      const { token } = action.payload;
      const data = { ...token, status: 1 };
      if (nowServingId !== 0) {
        this.snackBar.customSnackBar(
          "info",
          "Unable to call. You still have a current transaction"
        );

        return of(new OnServerError(1));
      }

      return this.service.callToken(token.id).pipe(
        switchMap(() => [
          new AddNowServing({ token: data }),
          new RemoveQueuePriority({ id: token.id })
        ]),
        catchError(err => of(new OnServerError(err)))
      );
    })
  );

  @Effect()
  backToPriority$ = this.actions$.pipe(
    ofType<BackToPriority>(QueuePriorityActionTypes.BACK_TO_PRIORITY),
    switchMap(action => {
      const { token } = action.payload;
      const data = { ...token, status: 0 };
      return this.service.backToQueueToken(token.id).pipe(
        switchMap(() => [
          new RemoveNowServing({ id: token.id }),
          new AddQueuePriority({ queuePriority: data })
        ]),
        catchError(err => of(new OnServerError(err)))
      );
    })
  );

  @Effect({ dispatch: false })
  OnServerError$ = this.actions$.pipe(
    ofType<OnServerError>(QueuePriorityActionTypes.ON_SERVER_ERROR),
    map(action => action.payload),
    map(resp => {
      let message = resp.error.payload ? resp.error.payload : "Ok";
      this.snackBar.customSnackBar("danger", message);
    })
  );

  constructor(
    private actions$: Actions,
    private service: MyCounterApiService,
    private nowServingStore: Store<fromNowServingState.State>,
    private snackBar: SnackBarService
  ) {}
}
