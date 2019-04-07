import { Injectable } from "@angular/core";

import { Select } from "@ngxs/store";
import { Dispatch } from "@ngxs-labs/dispatch-decorator";
import {
  AddTokens,
  IsTokenLoading,
  OnServerError,
  CallNextToken,
  BackToQueueToken,
  CallToken,
  ServeToken,
  FinishToken,
  StopToken,
  OnServerSuccess
} from "./../state/token.actions";
import { TokenState } from "./../state/token.state";

import { of, Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { MyCounterApiService } from "../services/my-counter-api.service";
import { SnackBarService } from "@core/services/snack-bar/snack-bar.service";
import { AlertDialogService } from "@shared/services/alert-dialog/alert-dialog.service";

import { TokenModel } from "../models";
import { MyCounterTimerService } from "../services/my-counter-timer.service";

@Injectable({
  providedIn: "root"
})
export class TokenFacadeService {
  timer$: Observable<string> = this.timerService.timer$;

  @Select(TokenState.isTokenLoading) isTokenLoading$: Observable<boolean>;
  @Select(TokenState.priorityToken) priorityTokens$: Observable<TokenModel[]>;
  @Select(TokenState.normalToken) normalTokens$: Observable<TokenModel[]>;
  @Select(TokenState.nowServingToken) nowServing$: Observable<TokenModel>;
  @Select(TokenState.pendingTokenCount) pendingTokenCount$: Observable<number>;
  @Select(TokenState.isServing) isServing$: Observable<boolean>;
  @Select(TokenState.isCalling) isCalling$: Observable<boolean>;

  startTimer() {
    this.timerService.startTimer();
  }

  stopTimer() {
    this.timerService.stopTimer();
  }

  resetTimer() {
    this.timerService.resetTimer();
  }

  @Dispatch() isTokenLoading = (isLoading: boolean) =>
    new IsTokenLoading(isLoading);

  @Dispatch() loadTokens = () => {
    this.isTokenLoading(true);
    return this.api.getNowPending().pipe(
      map(result => result.payload.data),
      map(data => {
        const tokens = data;
        this.isTokenLoading(false);
        return new AddTokens({ tokens });
      }),
      catchError(err => {
        this.isTokenLoading(false);
        this.snackBar.globalSnackBarError(err.status);
        return of(new OnServerError(err.status));
      })
    );
  };

  @Dispatch() callToken = (id: number, priority: number) => {
    this.startTimer();
    return new CallToken({ id, priority });
  };

  @Dispatch() callNext = () => {
    this.startTimer();
    return new CallNextToken();
  };

  @Dispatch() backToQueue = (id: number, priority: number) => {
    this.resetTimer();
    this.stopTimer();
    return new BackToQueueToken({ id, priority });
  };

  @Dispatch() callAgainToken = (id: number) => new OnServerSuccess(id);

  @Dispatch() serveToken = (id: number, token: any) => {
    const dialog = this.alertDialog.open({
      title: `Called Token #${token}`,
      content: "Would you like to start serving this token?"
    });
    return dialog.afterClosed().pipe(
      map(response => {
        if (response) {
          this.resetTimer();
          this.startTimer();
          return new ServeToken(id);
        }

        return new OnServerSuccess(true);
      })
    );
  };
  @Dispatch() completeToken = (id: number, token: any) => {
    const dialog = this.alertDialog.open({
      title: `Serving Token #${token}`,
      content: "Would you like to complete or finish this token transaction?"
    });
    return dialog.afterClosed().pipe(
      map(response => {
        if (response) {
          this.resetTimer();
          this.stopTimer();
          return new FinishToken(id);
        }

        return new OnServerSuccess(true);
      })
    );
  };
  @Dispatch() stopToken = (id: number, token: any) => {
    const dialog = this.alertDialog.open({
      title: `Serving Token #${token}`,
      content: "Would you like to stop this token transaction?"
    });
    return dialog.afterClosed().pipe(
      map(response => {
        if (response) {
          this.resetTimer();
          this.stopTimer();
          return new StopToken(id);
        }

        return new OnServerSuccess(true);
      })
    );
  };

  constructor(
    private api: MyCounterApiService,
    private snackBar: SnackBarService,
    private alertDialog: AlertDialogService,
    private timerService: MyCounterTimerService
  ) {}
}
