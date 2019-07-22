import { Injectable } from "@angular/core";

import { Select, Store } from "@ngxs/store";
import { Dispatch } from "@ngxs-labs/dispatch-decorator";

import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { IssueTokenState } from "../state/issue-token.state";
import {
  IsSaving,
  IssueTokenSuccess,
  AddDepartmentOptions
} from "../state/issue-token.actions";
import { IssueTokenApiService } from "../services";
import { IssueTokenModel, DepartmentModel } from "../models";

import { SnackBarService } from "@core/services/snack-bar/snack-bar.service";

@Injectable()
export class IssueTokenFacadeService {
  routerParams$: Observable<any>;
  @Select(IssueTokenState.isSaving) isSaving$: Observable<boolean>;
  @Select(IssueTokenState.generatedToken) generateToken$: Observable<
    IssueTokenModel
  >;
  @Select(IssueTokenState.departments) departments$: Observable<
    DepartmentModel[]
  >;

  @Dispatch() saving = (payload: boolean) => new IsSaving(payload);

  @Dispatch() getToken = (priority: number) => {
    this.saving(true);
    const department_id = this.store.selectSnapshot(
      state => state.router.state.params.department_id
    );
    const data = { priority, department_id };

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

  @Dispatch() loadDepartments = () => {
    return this.service.loadDepartments().pipe(
      map(response => response.payload.data),
      map(departments => new AddDepartmentOptions({ departments }))
    );
  };

  constructor(
    private service: IssueTokenApiService,
    private snackBar: SnackBarService,
    private store: Store
  ) {
    this.routerParams$ = this.store.select(state => state.router.state.params);
  }
}
