import { CounterUserModel, DepartmentModel } from "../models";
import { CounterModel } from "@features/counter/models";
import { UserStateModel } from "@core/models";

export class IsLoading {
  static readonly type = "[CounterUser] Is Loading";
  constructor(public payload: boolean) {}
}

export class IsSaving {
  static readonly type = "[CounterUser] Is Saving";
  constructor(public payload: boolean) {}
}

export class AddCounterUser {
  static readonly type = "[CounterUser] Add Counter User";
  constructor(public payload: { counterUser: CounterUserModel }) {}
}

export class AddCountersUser {
  static readonly type = "[CounterUser] Add Counters User";
  constructor(public payload: { countersUser: CounterUserModel[] }) {}
}

export class UpdateCounterUser {
  static readonly type = "[CounterUser] Update Counter User";
  constructor(public payload: { counterUser: CounterUserModel }) {}
}

export class SelectCounterUser {
  static readonly type = "[CounterUser] Select Counter User";
  constructor(public payload: number | string) {}
}

export class AddCounterOptions {
  static readonly type = "[CounterUser] Counter Options";
  constructor(public payload: { counters: CounterModel[] }) {}
}

export class AddUserOptions {
  static readonly type = "[CounterUser] User Options";
  constructor(public payload: { users: UserStateModel[] }) {}
}

export class AddDepartmentOptions {
  static readonly type = "[CounterUser] Department Options";
  constructor(public payload: { departments: DepartmentModel[] }) {}
}

export class DoNothingActions {
  static readonly type = "[CounterUser] Do Nothin Action";
}
