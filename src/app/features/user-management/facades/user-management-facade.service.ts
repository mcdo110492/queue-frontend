import { Injectable } from "@angular/core";

import { MatDialog } from "@angular/material/dialog";

import { Store, Select } from "@ngxs/store";
import { Dispatch } from "@ngxs-labs/dispatch-decorator";

import {
  AddUserManagement,
  AddUserManagements,
  AddDepartmentOptions,
  SelectUserManagement,
  UpdateUserManagement,
  DoNothingActions,
  IsLoading,
  IsSaving
} from "./../state/user-management.actions";
import { UserManagementState } from "./../state/user-management.state";
import {
  UserManagementModel,
  StatusModel,
  DepartmentModel,
  RoleModel
} from "./../models";

import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { EntityService } from "@core/services/entity/entity.service";
import { SnackBarService } from "@core/services/snack-bar/snack-bar.service";

import { UserManagementApiService } from "./../services/api/user-management-api.service";

@Injectable()
export class UserManagementFacadeService {
  entities$: Observable<UserManagementModel[]>;

  @Select(UserManagementState.isLoading) isLoading$: Observable<boolean>;
  @Select(UserManagementState.isSaving) isSaving$: Observable<boolean>;
  @Select(UserManagementState.selectedUser) selectedUser$: Observable<
    UserManagementModel
  >;
  @Select(UserManagementState.status) status$: Observable<StatusModel[]>;
  @Select(UserManagementState.departments) departments$: Observable<
    DepartmentModel[]
  >;
  @Select(UserManagementState.roles) roles$: Observable<RoleModel[]>;

  @Dispatch() loading = (loading: boolean) => new IsLoading(loading);

  @Dispatch() saving = (saving: boolean) => new IsSaving(saving);

  @Dispatch() loadUsers = () => {
    this.loading(true);
    return this.api.getUsers().pipe(
      map(result => result.payload.data),
      map(data => {
        let users = this.entityService.arrayToEntities(data);
        this.loading(false);
        return new AddUserManagements({ users });
      }),
      catchError(err => {
        this.loading(false);
        this.snackBar.globalSnackBarError(err.status);
        return of(new DoNothingActions());
      })
    );
  };

  @Dispatch() loadDepartmentOptions = () => {
    return this.api
      .loadDepartments()
      .pipe(map(departments => new AddDepartmentOptions({ departments })));
  };

  @Dispatch() createUser = (payload: { user: UserManagementModel }) => {
    return this.api.create(payload.user).pipe(
      map(result => result.payload.data),
      map(user => {
        this.saving(false);
        this.snackBar.customSnackBar("success", "Saved", "OK");
        this.dialog.getDialogById("user-form-dialog").close();
        return new AddUserManagement({ user });
      }),
      catchError(err => {
        this.saving(false);
        this.snackBar.globalSnackBarError(err.status);
        return of(new DoNothingActions());
      })
    );
  };

  @Dispatch() selectUser = (payload: number | string) =>
    new SelectUserManagement(payload);

  @Dispatch() editUser = (payload: { user: UserManagementModel }) => {
    return this.api.update(payload.user).pipe(
      map(result => result.payload.data),
      map(user => {
        this.saving(false);
        this.snackBar.customSnackBar("success", "Updated", "OK");
        this.dialog.getDialogById("user-form-dialog").close();
        return new UpdateUserManagement({ user });
      }),
      catchError(err => {
        this.saving(false);
        this.snackBar.globalSnackBarError(err.status);
        return of(new DoNothingActions());
      })
    );
  };

  getRole(role: number) {
    if (role === 1) {
      return "Admininstrator";
    } else if (role === 2) {
      return "Counter";
    } else {
      return "Unassigned";
    }
  }

  getStatus(status: number) {
    if (status === 0) {
      return "Inactive";
    } else {
      return "Active";
    }
  }
  constructor(
    private store: Store,
    private entityService: EntityService,
    private snackBar: SnackBarService,
    private api: UserManagementApiService,
    private dialog: MatDialog
  ) {
    this.entities$ = this.store.select(state => {
      return this.entityService.entitiesToArray(state.userManagement.entities);
    });
  }
}
