import { Action } from "@ngrx/store";
import { Update } from "@ngrx/entity";

import { CounterUserModel } from "@features/counter-user/models/counter-user.model";
import { CounterModel } from "@features/counter/models";
import { UserStateModel } from "@core/models";

export enum CounterUserActionTypes {
  LOAD_COUNTER_USERS = "[Counter User] Load Counter Users",
  ADD_COUNTER_USER = "[Counter User] Add Counter User",
  ADD_COUNTER_USERS = "[Counter User] Add Counter Users",
  UPDATE_COUNTER_USER = "[Counter User] Update Counter User",
  CLEAR_COUNTER_USERS = "[Counter User] Clear Counter Users",
  CREATE_NEW_COUNTER_USER_MODEL = "[Counter User] Create New Counter User Model",
  UPDATE_COUNTER_USER_MODEL = "[Counter User] Update Counter User Model",
  SELECT_COUNTER_USER_MODEL = "[Counter User] Select Counter User Model",
  LOAD_COUNTERS_OPTIONS = "[Counter User] Load Counter Options",
  LOAD_USERS_OPTIONS = "[Counter User] Load User Options",
  ADD_COUNTER_OPTIONS = "[Counter User] Add Counter Options",
  ADD_USER_OPTIONS = "[Counter User] Add User Options",
  ON_SERVER_ERROR = "[Counter User] On Server Error"
}

export class LoadCounterUsers implements Action {
  readonly type = CounterUserActionTypes.LOAD_COUNTER_USERS;
}

export class AddCounterUser implements Action {
  readonly type = CounterUserActionTypes.ADD_COUNTER_USER;
  constructor(public payload: { counter: CounterUserModel }) {}
}

export class AddCounterUsers implements Action {
  readonly type = CounterUserActionTypes.ADD_COUNTER_USERS;
  constructor(public payload: { counters: CounterUserModel[] }) {}
}

export class UpdateCounterUser implements Action {
  readonly type = CounterUserActionTypes.UPDATE_COUNTER_USER;
  constructor(public payload: { counter: Update<CounterUserModel> }) {}
}

export class ClearCounterUsers implements Action {
  readonly type = CounterUserActionTypes.CLEAR_COUNTER_USERS;
}

export class CreateNewCounterUserModel implements Action {
  readonly type = CounterUserActionTypes.CREATE_NEW_COUNTER_USER_MODEL;
  constructor(public payload: CounterUserModel) {}
}

export class UpdateCounterUserModel implements Action {
  readonly type = CounterUserActionTypes.UPDATE_COUNTER_USER_MODEL;
  constructor(public payload: CounterUserModel) {}
}

export class SelectCounterUserModel implements Action {
  readonly type = CounterUserActionTypes.SELECT_COUNTER_USER_MODEL;
  constructor(public payload: number | string) {}
}

export class LoadCounterOptions implements Action {
  readonly type = CounterUserActionTypes.LOAD_COUNTERS_OPTIONS;
}

export class LoadUserOptions implements Action {
  readonly type = CounterUserActionTypes.LOAD_USERS_OPTIONS;
}

export class AddCounterOptions implements Action {
  readonly type = CounterUserActionTypes.ADD_COUNTER_OPTIONS;
  constructor(public payload: CounterModel[]) {}
}

export class AddUserOptions implements Action {
  readonly type = CounterUserActionTypes.ADD_USER_OPTIONS;
  constructor(public payload: UserStateModel[]) {}
}

export class OnServerError implements Action {
  readonly type = CounterUserActionTypes.ON_SERVER_ERROR;
  constructor(public payload: any) {}
}

export type CounterUserActions =
  | LoadCounterUsers
  | AddCounterUser
  | AddCounterUsers
  | UpdateCounterUser
  | ClearCounterUsers
  | CreateNewCounterUserModel
  | UpdateCounterUserModel
  | SelectCounterUserModel
  | LoadCounterOptions
  | LoadUserOptions
  | AddCounterOptions
  | AddUserOptions
  | OnServerError;
