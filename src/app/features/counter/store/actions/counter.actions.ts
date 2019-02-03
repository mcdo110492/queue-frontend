import { Action } from "@ngrx/store";
import { Update } from "@ngrx/entity";
import { CounterModel } from "./../../models/counter.model";

export enum CounterActionTypes {
  LOAD_COUNTERS = "[Counter] Load Counters",
  ADD_COUNTER = "[Counter] Add Counter",
  ADD_COUNTERS = "[Counter] Add Counters",
  UPDATE_COUNTER = "[Counter] Update Counter",
  CLEAR_COUNTERS = "[Counter] Clear Counters"
}

export class LoadCounters implements Action {
  readonly type = CounterActionTypes.LOAD_COUNTERS;
}

export class AddCounter implements Action {
  readonly type = CounterActionTypes.ADD_COUNTER;
  constructor(public payload: { counter: CounterModel }) {}
}

export class AddCounters implements Action {
  readonly type = CounterActionTypes.ADD_COUNTERS;
  constructor(public payload: { counters: CounterModel[] }) {}
}

export class UpdateCounter implements Action {
  readonly type = CounterActionTypes.UPDATE_COUNTER;
  constructor(public payload: { counter: Update<CounterModel> }) {}
}

export class ClearUsers implements Action {
  readonly type = CounterActionTypes.CLEAR_COUNTERS;
}

export type CounterActions =
  | LoadCounters
  | AddCounter
  | AddCounters
  | UpdateCounter
  | ClearUsers;
