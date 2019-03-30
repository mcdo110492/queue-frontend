import { Injectable } from "@angular/core";

import { Select } from "@ngxs/store";
import { Dispatch } from "@ngxs-labs/dispatch-decorator";

import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { IssueTokenState } from "../state/issue-token.state";
import { IsSaving, IssueTokenSuccess } from "../state/issue-token.actions";
import { IssueTokenApiService } from "../services";
import { IssueTokenModel } from "../models";

import { SnackBarService } from "@core/services/snack-bar/snack-bar.service";

@Injectable()
export class IssueTokenFacadeService {
  @Select(IssueTokenState.isSaving) isSaving$: Observable<boolean>;
  @Select(IssueTokenState.generatedToken) generateToken$: Observable<
    IssueTokenModel
  >;

  @Dispatch() saving = (payload: boolean) => new IsSaving(payload);

  @Dispatch() getToken = (priority: number) => {
    this.saving(true);
    const data = { priority };
    return this.service.generateToken(data).pipe(
      map(response => {
        this.saving(false);
        this.service.openPrintDialog();
        return new IssueTokenSuccess(response.payload);
      }),
      catchError(err => {
        this.snackBar.globalSnackBarError(err.status);
        return of(new IsSaving(false));
      })
    );
  };

  constructor(
    private service: IssueTokenApiService,
    private snackBar: SnackBarService
  ) {}
}
