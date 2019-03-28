import { Action } from "@ngrx/store";

import { TokenModel } from "@features/my-counter/models/token.model";

export enum NowServingActionTypes {
  ADD_NOW_SERVING = "[NOWSERVING] Add Now Serving",
  REMOVE_NOW_SERVING = "[NOWSERVING] Remove Now Serving"
}

export class AddNowServing implements Action {
  readonly type = NowServingActionTypes.ADD_NOW_SERVING;
  constructor(public payload: { token: TokenModel }) {}
}

export class RemoveNowServing implements Action {
  readonly type = NowServingActionTypes.REMOVE_NOW_SERVING;
  constructor(public payload: { id: number }) {}
}

export type NowServingActions = AddNowServing | RemoveNowServing;
