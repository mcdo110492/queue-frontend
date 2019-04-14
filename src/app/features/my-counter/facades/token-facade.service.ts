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
  OnServerSuccess,
  NowServing,
  LastUserTransaction,
  AddToken,
  RemoveIdToken,
  AddIdToken
} from "./../state/token.actions";
import { TokenState } from "./../state/token.state";

import { of, Observable } from "rxjs";
import { map, catchError, combineLatest, concatMap } from "rxjs/operators";

import { TokenModel } from "../models";

import { MyCounterApiService } from "../services/my-counter-api.service";
import { SnackBarService } from "@core/services/snack-bar/snack-bar.service";
import { AlertDialogService } from "@shared/services/alert-dialog/alert-dialog.service";
import { MyCounterTimerService } from "../services/my-counter-timer.service";
import { DialogLoaderService } from "@shared/services/dialog-loader/dialog-loader.service";
import { AuthFacadesService } from "@core/facades/auth-facades.service";

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

  @Dispatch() addIssueTokenWS = (token: TokenModel) => new AddToken({ token });

  @Dispatch() backToQueueWS = (id: number, priority: number) =>
    new BackToQueueToken({ id, priority });

  @Dispatch() addTokenWS = (id: number, priority: number) =>
    new AddIdToken({ id, priority });

  @Dispatch() removeTokenWS = (id: number, priority: number) =>
    new RemoveIdToken({ id, priority });

  @Dispatch() callToken = (id: number, priority: number, token: any) => {
    const dialog = this.alertDialog.open({
      title: `Calling Token #${token}`,
      content: `Would you like to start calling this token?`
    });
    this.authFacade.addSocketId(window.Laravel.socketId());
    return dialog.afterClosed().pipe(
      concatMap(isYes => {
        if (isYes) {
          this.dialogLoader.openLoader();
          return this.api.callToken(id, "00:00").pipe(
            map(response => {
              this.dialogLoader.closeLoader();
              this.snackBar.customSnackBar("info", response.payload.message);
              this.startTimer();
              return new CallToken({ id, priority });
            }),
            catchError(err => {
              this.dialogLoader.closeLoader();
              this.snackBar.customSnackBar("danger", err.error.payload.message);
              return of(new OnServerError(err.status));
            })
          );
        }
        return of();
      })
    );
  };

  @Dispatch() nowServing = (id: number) => new NowServing(id);

  @Dispatch() callNext = () => {
    const dialog = this.alertDialog.open({
      title: "Call the next token",
      content: "Token is called based on the queue list"
    });
    this.nowServing(1);
    this.authFacade.addSocketId(window.Laravel.socketId());

    return dialog.afterClosed().pipe(
      combineLatest(this.nowServing$),
      concatMap(([isYes, nowServingToken]) => {
        if (isYes) {
          const { id } = nowServingToken;
          this.dialogLoader.openLoader();
          return this.api.callToken(id, "00:00").pipe(
            map(response => {
              this.dialogLoader.closeLoader();
              this.snackBar.customSnackBar("info", response.payload.message);
              this.startTimer();
              return new CallNextToken();
            }),
            catchError(err => {
              this.dialogLoader.closeLoader();
              this.snackBar.customSnackBar("danger", err.error.payload.message);
              return of(new OnServerError(err.status));
            })
          );
        }
        return of(new NowServing(0));
      })
    );
  };

  @Dispatch() backToQueue = (id: number, priority: number, token: any) => {
    const dialog = this.alertDialog.open({
      title: `Token #${token}`,
      content: "Would you like to return this token to queue?"
    });

    this.authFacade.addSocketId(window.Laravel.socketId());

    return dialog.afterClosed().pipe(
      combineLatest(this.timer$),
      concatMap(([isYes, servedTime]) => {
        if (isYes) {
          this.dialogLoader.openLoader();
          return this.api.backToQueueToken(id, servedTime).pipe(
            map(response => {
              this.dialogLoader.closeLoader();
              this.snackBar.customSnackBar("info", response.payload.message);
              this.resetTimer();
              this.stopTimer();
              return new BackToQueueToken({ id, priority });
            }),
            catchError(err => {
              this.dialogLoader.closeLoader();
              this.snackBar.customSnackBar("danger", err.error.payload.message);
              return of(new OnServerError(err.status));
            })
          );
        }
        return of();
      })
    );
  };

  @Dispatch() callAgainToken = (id: number, token: any) => {
    const dialog = this.alertDialog.open({
      title: `Calling Token #${token}`,
      content: "Would you like to call again this token?"
    });

    return dialog.afterClosed().pipe(
      combineLatest(this.timer$),
      concatMap(([isYes, servedTime]) => {
        if (isYes) {
          this.dialogLoader.openLoader();
          return this.api.callAgainToken(id, servedTime).pipe(
            map(response => {
              this.dialogLoader.closeLoader();
              this.snackBar.customSnackBar("info", response.payload.message);
              return new OnServerSuccess(true);
            }),
            catchError(err => {
              this.dialogLoader.closeLoader();
              this.snackBar.customSnackBar("danger", err.error.payload.message);
              return of(new OnServerError(err.status));
            })
          );
        }
        return of();
      })
    );
  };

  @Dispatch() serveToken = (id: number, token: any) => {
    const dialog = this.alertDialog.open({
      title: `Called Token #${token}`,
      content: "Would you like to start serving this token?"
    });

    return dialog.afterClosed().pipe(
      combineLatest(this.timer$),
      concatMap(([isYes, servedTime]) => {
        if (isYes) {
          this.dialogLoader.openLoader();
          return this.api.serveToken(id, servedTime).pipe(
            map(response => {
              this.dialogLoader.closeLoader();
              this.snackBar.customSnackBar("info", response.payload.message);
              this.resetTimer();
              this.startTimer();
              return new ServeToken(id);
            }),
            catchError(err => {
              this.dialogLoader.closeLoader();
              this.snackBar.customSnackBar("danger", err.error.payload.message);
              return of(new OnServerError(err.status));
            })
          );
        }
        return of();
      })
    );
  };

  @Dispatch() completeToken = (id: number, token: any) => {
    const dialog = this.alertDialog.open({
      title: `Serving Token #${token}`,
      content: "Would you like to complete or finish this token transaction?"
    });

    return dialog.afterClosed().pipe(
      combineLatest(this.timer$),
      concatMap(([isYes, servedTime]) => {
        if (isYes) {
          this.dialogLoader.openLoader();
          return this.api.completeToken(id, servedTime).pipe(
            map(response => {
              this.dialogLoader.closeLoader();
              this.snackBar.customSnackBar("info", response.payload.message);
              this.resetTimer();
              this.stopTimer();
              return new FinishToken(id);
            }),
            catchError(err => {
              this.dialogLoader.closeLoader();
              this.snackBar.customSnackBar("danger", err.error.payload.message);
              return of(new OnServerError(err.status));
            })
          );
        }
        return of();
      })
    );
  };

  @Dispatch() stopToken = (id: number, token: any) => {
    const dialog = this.alertDialog.open({
      title: `Serving Token #${token}`,
      content: "Would you like to stop this token transaction?"
    });

    return dialog.afterClosed().pipe(
      combineLatest(this.timer$),
      concatMap(([isYes, servedTime]) => {
        if (isYes) {
          this.dialogLoader.openLoader();
          return this.api.stopToken(id, servedTime).pipe(
            map(response => {
              this.dialogLoader.closeLoader();
              this.snackBar.customSnackBar("info", response.payload.message);
              this.resetTimer();
              this.stopTimer();
              return new StopToken(id);
            }),
            catchError(err => {
              this.dialogLoader.closeLoader();
              this.snackBar.customSnackBar("danger", err.error.payload.message);
              return of(new OnServerError(err.status));
            })
          );
        }
        return of();
      })
    );
  };

  @Dispatch() getUserLastTransaction = () => {
    this.dialogLoader.openLoader();

    return this.api.lastUserTrasanction().pipe(
      map(response => {
        this.dialogLoader.closeLoader();
        if (response.token) {
          const { ticket, status } = response.token;
          if (status === 1 || status === 2) {
            this.startTimer();
          }
          const payload = { token: ticket, status };
          return new LastUserTransaction(payload);
        }

        return new OnServerSuccess(true);
      }),
      catchError(err => {
        this.dialogLoader.closeLoader();
        this.snackBar.globalSnackBarError(err.status);
        return of(new OnServerError(err.status));
      })
    );
  };

  constructor(
    private api: MyCounterApiService,
    private snackBar: SnackBarService,
    private alertDialog: AlertDialogService,
    private timerService: MyCounterTimerService,
    private dialogLoader: DialogLoaderService,
    private authFacade: AuthFacadesService
  ) {}
}
