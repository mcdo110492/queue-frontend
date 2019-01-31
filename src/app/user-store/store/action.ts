import { Action } from "@ngrx/store";
import { UserModel } from "../models";

export enum ActionTypes {
  AUTHENTICATE = "[LOGIN] Authenticate",
  LOG_OUT = "[LOGOUT] Logout",
  ADD_USER_CREDENTIALS = "[USER STORE] Add User Credentials",
  REMOVE_USER_CREDENTIALS = "[USER STORE] Remove User Credentials"
}

export class Authenticate implements Action {
  readonly type = ActionTypes.AUTHENTICATE;
  constructor(public payload: { username: string; password: string }) {}
}

export class Logout implements Action {
  readonly type = ActionTypes.LOG_OUT;
}

export class AddUserCredentials implements Action {
  readonly type = ActionTypes.ADD_USER_CREDENTIALS;

  constructor(public payload: UserModel) {}
}

export class RemoveUserCredentials implements Action {
  readonly type = ActionTypes.REMOVE_USER_CREDENTIALS;
}

export type Actions =
  | Authenticate
  | Logout
  | AddUserCredentials
  | RemoveUserCredentials;
