import { Action } from "@ngrx/store";
import { UserStateModel } from "@core/models";

export enum ActionTypes {
  AUTHENTICATE = "[USER STORE] Authenticate",
  ADD_USER_CREDENTIALS = "[USER STORE] Add User Credentials",
  REMOVE_USER_CREDENTIALS = "[USER STORE] Remove User Credentials",
  LOGOUT = "[LOGOUT] Logout"
}

export class Authenticate implements Action {
  readonly type = ActionTypes.AUTHENTICATE;
  constructor(public payload: { username: string; password: string }) {}
}

export class AddUserCredentials implements Action {
  readonly type = ActionTypes.ADD_USER_CREDENTIALS;

  constructor(public payload: UserStateModel) {}
}

export class RemoveUserCredentials implements Action {
  readonly type = ActionTypes.REMOVE_USER_CREDENTIALS;
}

export class Logout implements Action {
  readonly type = ActionTypes.LOGOUT;
}

export type Actions =
  | Authenticate
  | AddUserCredentials
  | RemoveUserCredentials
  | Logout;
