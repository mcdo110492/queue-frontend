import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";

import { MatDialog } from "@angular/material/dialog";

import { of } from "rxjs";
import { map, catchError, concatMap } from "rxjs/operators";

import { SnackBarService } from "@core/services/snack-bar/snack-bar.service";
import { IssueTokenApiService } from "@features/issue-token/services/issue-token-api/issue-token-api.service";

import { IssueTokenPrintDialogComponent } from "@features/issue-token/components";

import * as fromIssueTokenActions from "../actions/issue-token.actions";

@Injectable()
export class IssueTokenEffects {
  @Effect()
  generateToken$ = this.actions$.pipe(
    ofType<fromIssueTokenActions.GetIssueToken>(
      fromIssueTokenActions.IssueTokenActionTypes.GET_ISSUE_TOKEN
    ),
    map(action => action.payload),
    concatMap(data => {
      return this.service.generateToken(data).pipe(
        map(
          response =>
            new fromIssueTokenActions.IssueTokenSuccess(response.payload)
        ),
        catchError(err => of(new fromIssueTokenActions.OnServerError(err)))
      );
    })
  );

  @Effect({ dispatch: false })
  generateTokenSuccess$ = this.actions$.pipe(
    ofType<fromIssueTokenActions.IssueTokenSuccess>(
      fromIssueTokenActions.IssueTokenActionTypes.ISSUE_TOKEN_SUCCESS
    ),
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
    ofType<fromIssueTokenActions.OnServerError>(
      fromIssueTokenActions.IssueTokenActionTypes.ON_SERVER_ERROR
    ),
    map(action => {
      this.snackBar.globalSnackBarError(action.payload.status);
    })
  );

  constructor(
    private actions$: Actions,
    private service: IssueTokenApiService,
    private snackBar: SnackBarService,
    private dialog: MatDialog
  ) {}
}
