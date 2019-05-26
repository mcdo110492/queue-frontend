import { IssueTokenModel, DepartmentModel } from "../models";

export class IssueTokenSuccess {
  static readonly type = "[IssueToken] Issue Token Success";
  constructor(public payload: IssueTokenModel) {}
}

export class IsSaving {
  static readonly type = "[IssueToken] Is Saving";
  constructor(public payload: boolean) {}
}

export class AddDepartmentOptions {
  static readonly type = "[IssueToken] Add Department Options";
  constructor(public payload: { departments: DepartmentModel[] }) {}
}
