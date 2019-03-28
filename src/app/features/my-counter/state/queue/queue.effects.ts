import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";

import { of, Observable } from "rxjs";
import { switchMap, map, catchError, withLatestFrom } from "rxjs/operators";

import { MyCounterApiService } from "@features/my-counter/services";
import { SnackBarService } from "@core/services/snack-bar/snack-bar.service";

import {
  QueueActionTypes,
  OnServerError,
  AddTokens,
  BackToQueueToken,
  CallToken,
  RemoveToken,
  AddToken,
  OnServerSuccess,
  CallTokenAgain,
  ServeToken
} from "./queue.actions";
import * as fromQueueReducer from "./queue.reducer";
import * as fromQueueSelector from "./queue.selector";

import * as fromQueuePriorityReducer from "./../queue-priority/queue-priority.reducer";
import * as fromQueuePrioritySelector from "./../queue-priority/queue-priority.selector";

import {
  AddNowServing,
  RemoveNowServing
} from "../now-serving/now-serving.actions";

import * as fromNowServingSelectors from "../now-serving/now-serving.selector";
import * as fromNowServingState from "../now-serving/now-serving.reducer";
import { CallPriority } from "../queue-priority/queue-priority.actions";

@Injectable()
export class QueueEffects {
  @Effect()
  loadQueues$ = this.actions$.pipe(
    ofType(QueueActionTypes.LOAD_TOKENS),
    switchMap(() => {
      return this.service.getNowPending(0).pipe(
        map(resp => new AddTokens({ queues: resp.payload.data })),
        catchError(err => of(new OnServerError(err)))
      );
    })
  );

  @Effect()
  callToken$ = this.actions$.pipe(
    ofType<CallToken>(QueueActionTypes.CALL_TOKEN),
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
          new RemoveToken({ id: token.id })
        ]),
        catchError(err => of(new OnServerError(err)))
      );
    })
  );

  @Effect()
  backToQueue$ = this.actions$.pipe(
    ofType<BackToQueueToken>(QueueActionTypes.BACK_TO_QUEUE_TOKEN),
    switchMap(action => {
      const { token } = action.payload;
      const data = { ...token, status: 0 };
      return this.service.backToQueueToken(token.id).pipe(
        switchMap(() => [
          new RemoveNowServing({ id: token.id }),
          new AddToken({ queue: data })
        ]),
        catchError(err => of(new OnServerError(err)))
      );
    })
  );

  @Effect()
  callNext$ = this.actions$.pipe(
    ofType(QueueActionTypes.CALL_NEXT),
    withLatestFrom(
      this.nowServingStore.select(fromNowServingSelectors.selectedNowServingId),
      this.queueStore.select(fromQueueSelector.selectFirstQueue),
      this.queuePriorityStore.select(
        fromQueuePrioritySelector.selectFirstQueuePriority
      )
    ),
    map(([action, nowServingId, queue, queuePriority]) => {
      if (nowServingId == 0) {
        if (queuePriority.id != 0) {
          return new CallPriority({ token: queuePriority });
        }

        if (queue.id != 0) {
          return new CallToken({ token: queue });
        }
      }

      this.snackBar.customSnackBar(
        "info",
        "Unable to call. You still have a current transaction"
      );

      return new OnServerSuccess(1);
    })
  );

  @Effect()
  callAgain$ = this.actions$.pipe(
    ofType<CallTokenAgain>(QueueActionTypes.CALL_AGAIN_TOKEN),
    map(action => action.payload.token),
    switchMap(token => {
      return this.service.callAgainToken(token.id).pipe(
        map(() => {
          const message = `You called again this token #${token.ticket_number}`;
          this.snackBar.customSnackBar("info", message);
          return new OnServerSuccess(1);
        }),
        catchError(err => of(new OnServerError(err)))
      );
    })
  );

  @Effect()
  serveToken$ = this.actions$.pipe(
    ofType<ServeToken>(QueueActionTypes.SERVE_TOKEN),
    map(action => action.payload.token),
    switchMap(token => {
      return this.service.serveToken(token.id).pipe(
        map(action => action.payload.data.ticket),
        map(token => [
          new RemoveNowServing({ id: token.id }),
          new AddNowServing({ token })
        ]),
        catchError(err => of(new OnServerError(err)))
      );
    })
  );

  @Effect({ dispatch: false })
  OnServerError$ = this.actions$.pipe(
    ofType<OnServerError>(QueueActionTypes.ON_SERVER_ERROR),
    map(action => action.payload),
    map(resp => {
      let message = resp.error.payload ? resp.error.payload : "Ok";
      this.snackBar.customSnackBar("danger", message);
    })
  );

  constructor(
    private actions$: Actions,
    private queueStore: Store<fromQueueReducer.State>,
    private queuePriorityStore: Store<fromQueuePriorityReducer.State>,
    private nowServingStore: Store<fromNowServingState.State>,
    private service: MyCounterApiService,
    private snackBar: SnackBarService
  ) {}
}
