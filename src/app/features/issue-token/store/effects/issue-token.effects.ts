import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";

import {
  IssueTokenActionTypes,
  IssueTokenSuccess,
  OnServerError,
  GetIssueToken
} from "../actions/issue-token.actions";

import { map, catchError, concatMap } from "rxjs/operators";
import { of } from "rxjs";

import { SnackBarHelperService } from "@helpers/snack-bar-helper/snack-bar-helper.service";

import { IssueTokenApiService } from "./../../services/issue-token-api/issue-token-api.service";

import { MatDialog } from "@angular/material/dialog";
import { IssueTokenPrintDialogComponent } from "@features/issue-token/components";

@Injectable()
export class IssueTokenEffects {
  @Effect()
  generateToken$ = this.actions$.pipe(
    ofType<GetIssueToken>(IssueTokenActionTypes.GET_ISSUE_TOKEN),
    map(action => action.payload),
    concatMap(data => {
      return this.service.generateToken(data).pipe(
        map(response => new IssueTokenSuccess(response.payload)),
        catchError(err => of(new OnServerError(err)))
      );
    })
  );

  @Effect({ dispatch: false })
  generateTokenSuccess$ = this.actions$.pipe(
    ofType<IssueTokenSuccess>(IssueTokenActionTypes.ISSUE_TOKEN_SUCCESS),
    map(() => {
      this.dialog.open(IssueTokenPrintDialogComponent, {
        id: "print-issue-token-dialog",
        width: "384px",
        height: "288px",
        hasBackdrop: false
      });
    })
  );

  @Effect({ dispatch: false })
  onServerErr$ = this.actions$.pipe(
    ofType<OnServerError>(IssueTokenActionTypes.ON_SERVER_ERROR),
    map(action => {
      this.snackBar.snackError(action.payload.status);
    })
  );

  constructor(
    private actions$: Actions,
    private service: IssueTokenApiService,
    private snackBar: SnackBarHelperService,
    private dialog: MatDialog
  ) {}
}
