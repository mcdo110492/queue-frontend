import { DepartmentModel } from "../models";

export class AddDepartment {
  static readonly type = "[Department] Add Department";
  constructor(public payload: { department: DepartmentModel }) {}
}

export class IsLoading {
  static readonly type = "[Department] Is Loading";
  constructor(public payload: boolean) {}
}

export class IsSaving {
  static readonly type = "[Department] Is Saving";
  constructor(public payload: boolean) {}
}

export class AddDepartments {
  static readonly type = "[Department] Add Departments";
  constructor(public payload: { departments: DepartmentModel[] }) {}
}

export class UpdateDepartment {
  static readonly type = "[Department] Update Department";
  constructor(public payload: { department: DepartmentModel }) {}
}

export class SelectDepartment {
  static readonly type = "[Department] Select Department";
  constructor(public payload: number | string) {}
}
