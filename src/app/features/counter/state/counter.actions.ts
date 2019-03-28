import { CounterModel } from "../models";

export class AddCounter {
  static readonly type = "[Counter] Add Counter";
  constructor(public payload: { counter: CounterModel }) {}
}

export class IsLoading {
  static readonly type = "[Counter] Is Loading";
  constructor(public payload: boolean) {}
}

export class IsSaving {
  static readonly type = "[Counter] Is Saving";
  constructor(public payload: boolean) {}
}

export class AddCounters {
  static readonly type = "[Counter] Add Counters";
  constructor(public payload: { counters: CounterModel[] }) {}
}

export class UpdateCounter {
  static readonly type = "[Counter] Update Counter";
  constructor(public payload: { counter: CounterModel }) {}
}

export class SelectCounter {
  static readonly type = "[Counter] Select Counter";
  constructor(public payload: number | string) {}
}
