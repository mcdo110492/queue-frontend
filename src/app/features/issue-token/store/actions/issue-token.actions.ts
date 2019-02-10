import { Action } from "@ngrx/store";
import { IssueTokenModel } from "../../models";

export enum IssueTokenActionTypes {
  GET_ISSUE_TOKEN = "[Issue Token] Get Issue Token",
  ISSUE_TOKEN_SUCCESS = "[Issue Token] Issue Token Success",
  ON_SERVER_ERROR = "[Issue Token] On Server Error"
}

export class GetIssueToken implements Action {
  readonly type = IssueTokenActionTypes.GET_ISSUE_TOKEN;
  constructor(public payload: { priority: number }) {}
}

export class IssueTokenSuccess implements Action {
  readonly type = IssueTokenActionTypes.ISSUE_TOKEN_SUCCESS;
  constructor(public payload: IssueTokenModel) {}
}

export class OnServerError implements Action {
  readonly type = IssueTokenActionTypes.ON_SERVER_ERROR;
  constructor(public payload: any) {}
}

export type IssueTokenActions =
  | GetIssueToken
  | IssueTokenSuccess
  | OnServerError;
