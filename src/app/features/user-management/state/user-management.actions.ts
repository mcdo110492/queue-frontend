import { UserManagementModel } from "../models/user-management.model";
import { DepartmentModel } from "../models/department.model";

export class AddUserManagement {
  static readonly type = "[UserManagement] Add UserManagement";
  constructor(public payload: { user: UserManagementModel }) {}
}

export class IsLoading {
  static readonly type = "[UserManagement] Is Loading";
  constructor(public payload: boolean) {}
}

export class IsSaving {
  static readonly type = "[UserManagement] Is Saving";
  constructor(public payload: boolean) {}
}

export class AddUserManagements {
  static readonly type = "[UserManagement] Add UserManagements";
  constructor(public payload: { users: UserManagementModel[] }) {}
}

export class UpdateUserManagement {
  static readonly type = "[UserManagement] Update UserManagement";
  constructor(public payload: { user: UserManagementModel }) {}
}

export class SelectUserManagement {
  static readonly type = "[UserManagement] Select UserManagement";
  constructor(public payload: number | string) {}
}

export class AddDepartmentOptions {
  static readonly type = "[UserManagement] Add Department Options";
  constructor(public payload: { departments: DepartmentModel[] }) {}
}

export class DoNothingActions {
  static readonly type = "[UserManagement] Do Nothing Actions";
}
