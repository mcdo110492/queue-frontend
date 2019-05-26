import { Injectable } from "@angular/core";

import { MatDialog } from "@angular/material/dialog";

import { Store, Select } from "@ngxs/store";
import { Dispatch } from "@ngxs-labs/dispatch-decorator";

import {
  AddDepartment,
  AddDepartments,
  SelectDepartment,
  UpdateDepartment,
  IsLoading,
  IsSaving
} from "./../state/departments.actions";
import { DepartmentsState } from "./../state/departments.state";
import { DepartmentModel } from "./../models";

import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { EntityService } from "@core/services/entity/entity.service";
import { SnackBarService } from "@core/services/snack-bar/snack-bar.service";

import { DepartmentApiService } from "./../services";

@Injectable()
export class DeparmentsFacadeService {
  entities$: Observable<DepartmentModel[]>;

  @Select(DepartmentsState.isLoading) isLoading$: Observable<boolean>;
  @Select(DepartmentsState.isSaving) isSaving$: Observable<boolean>;
  @Select(DepartmentsState.selectedDepartment) selectedDepartment$: Observable<
    DepartmentModel
  >;

  @Dispatch() loading = (loading: boolean) => new IsLoading(loading);

  @Dispatch() saving = (saving: boolean) => new IsSaving(saving);

  @Dispatch() loadDepartments = () => {
    this.loading(true);
    return this.api.getDepartments().pipe(
      map(result => result.payload.data),
      map(data => {
        let departments = this.entityService.arrayToEntities(data);
        this.loading(false);
        return new AddDepartments({ departments });
      }),
      catchError(err => {
        this.loading(false);
        this.snackBar.globalSnackBarError(err.status);
        return of();
      })
    );
  };

  @Dispatch() createDepartment = (payload: { department: DepartmentModel }) => {
    return this.api.create(payload.department).pipe(
      map(result => result.payload.data),
      map(department => {
        this.saving(false);
        this.snackBar.customSnackBar("success", "Saved", "OK");
        this.dialog.getDialogById("department-form-dialog").close();
        return new AddDepartment({ department });
      }),
      catchError(err => {
        this.saving(false);
        this.snackBar.globalSnackBarError(err.status);
        return of();
      })
    );
  };

  @Dispatch() selectDepartment = (payload: number | string) =>
    new SelectDepartment(payload);

  @Dispatch() editDepartment = (payload: { department: DepartmentModel }) => {
    return this.api.update(payload.department).pipe(
      map(result => result.payload.data),
      map(department => {
        this.saving(false);
        this.snackBar.customSnackBar("success", "Updated", "OK");
        this.dialog.getDialogById("department-form-dialog").close();
        return new UpdateDepartment({ department });
      }),
      catchError(err => {
        this.saving(false);
        this.snackBar.globalSnackBarError(err.status);
        return of();
      })
    );
  };
  constructor(
    private store: Store,
    private entityService: EntityService,
    private snackBar: SnackBarService,
    private api: DepartmentApiService,
    private dialog: MatDialog
  ) {
    this.entities$ = this.store.select(state => {
      return this.entityService.entitiesToArray(state.departments.entities);
    });
  }
}
