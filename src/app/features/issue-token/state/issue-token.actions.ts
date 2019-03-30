import { IssueTokenModel } from "../models";

export class IssueTokenSuccess {
  static readonly type = "[IssueToken] Issue Token Success";
  constructor(public payload: IssueTokenModel) {}
}

export class IsSaving {
  static readonly type = "[IssueToken] Is Saving";
  constructor(public payload: boolean) {}
}
