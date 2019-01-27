import { Action } from "@ngrx/store";
import { UserModel } from "../models";

export enum ActionTypes {
  ADD_USER_CREDENTIALS = "[USER STORE] Add User Credentials",
  REMOVE_USER_CREDENTIALS = "[USER STORE] Remove User Credentials"
}

export class AddUserCredentials implements Action {
  readonly type = ActionTypes.ADD_USER_CREDENTIALS;

  constructor(public payload: UserModel) {}
}

export class RemoveUserCredentials implements Action {
  readonly type = ActionTypes.REMOVE_USER_CREDENTIALS;
}

export type Actions = AddUserCredentials | RemoveUserCredentials;
