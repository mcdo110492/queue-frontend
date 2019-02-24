import { Action } from "@ngrx/store";
import { Update } from "@ngrx/entity";
import { CounterModel } from "@features/counter/models/counter.model";

export enum CounterActionTypes {
  LOAD_COUNTERS = "[Counter] Load Counters",
  ADD_COUNTER = "[Counter] Add Counter",
  ADD_COUNTERS = "[Counter] Add Counters",
  UPDATE_COUNTER = "[Counter] Update Counter",
  CLEAR_COUNTERS = "[Counter] Clear Counters",
  CREATE_NEW_COUNTER_MODEL = "[Counter] Create New Counter Model",
  UPDATE_COUNTER_MODEL = "[Counter] Update Counter Model",
  SELECT_COUNTER_MODEL = "[Counter] Select Counter Model",
  ON_SERVER_ERROR = "[Counter] On Server Error"
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

export class CreateNewCounterModel implements Action {
  readonly type = CounterActionTypes.CREATE_NEW_COUNTER_MODEL;
  constructor(public payload: CounterModel) {}
}

export class UpdateCounterModel implements Action {
  readonly type = CounterActionTypes.UPDATE_COUNTER_MODEL;
  constructor(public payload: CounterModel) {}
}

export class SelectCounterModel implements Action {
  readonly type = CounterActionTypes.SELECT_COUNTER_MODEL;
  constructor(public payload: number | string) {}
}

export class OnServerError implements Action {
  readonly type = CounterActionTypes.ON_SERVER_ERROR;
  constructor(public payload: any) {}
}

export type CounterActions =
  | LoadCounters
  | AddCounter
  | AddCounters
  | UpdateCounter
  | ClearUsers
  | CreateNewCounterModel
  | UpdateCounterModel
  | SelectCounterModel
  | OnServerError;
