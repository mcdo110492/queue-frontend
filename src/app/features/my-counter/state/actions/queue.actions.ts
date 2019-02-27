import { Action } from "@ngrx/store";

import { TokenModel } from "@features/my-counter/models/token.model";

export enum QueueActionTypes {
  LOAD_TOKENS = "[MYCOUNTER] Load Tokens",
  ADD_TOKENS = "[MYCOUNTER] Add Tokens",
  ADD_TOKEN = "[MYCOUNTER] Add Token",
  REMOVE_TOKEN = "[MYCOUNTER] Remove Token",
  CALL_TOKEN = "[MYCOUNTER] Call Token",
  CALL_NEXT_TOKEN = "[MYCOUNTER] Call Next Token",
  CALL_AGAIN_TOKEN = "[MYCOUNTER] Call Again Token",
  SERVE_TOKEN = "[MYCOUNTER] Serve Token",
  COMPLETE_TOKEN = "[MYCOUNTER] Complete Token",
  STOP_TOKEN = "[MYCOUNTER] Stop Token",
  BACK_TO_QUEUE = "[MYCOUNTER] Back To Queue",
  BACKEND_SUCCESS = "[MYCOUNTER] Backend Success",
  ON_SERVER_ERROR = "[MYCOUNTER] On Server Error"
}

export class LoadTokens implements Action {
  readonly type = QueueActionTypes.LOAD_TOKENS;
}

export class AddTokens implements Action {
  readonly type = QueueActionTypes.ADD_TOKENS;
  constructor(public payload: { tokens: TokenModel[] }) {}
}

export class AddToken implements Action {
  readonly type = QueueActionTypes.ADD_TOKEN;
  constructor(public payload: { token: TokenModel }) {}
}

export class RemoveToken implements Action {
  readonly type = QueueActionTypes.REMOVE_TOKEN;
  constructor(public payload: { id: number }) {}
}

export class CallToken implements Action {
  readonly type = QueueActionTypes.CALL_TOKEN;
  constructor(public payload: { id: number }) {}
}

export class CallNextToken implements Action {
  readonly type = QueueActionTypes.CALL_NEXT_TOKEN;
}

export class CallAgainToken implements Action {
  readonly type = QueueActionTypes.CALL_AGAIN_TOKEN;
  constructor(public payload: { id: number }) {}
}

export class ServeToken implements Action {
  readonly type = QueueActionTypes.SERVE_TOKEN;
  constructor(public payload: { id: number }) {}
}

export class CompleteToken implements Action {
  readonly type = QueueActionTypes.COMPLETE_TOKEN;
  constructor(public payload: { id: number }) {}
}

export class StopToken implements Action {
  readonly type = QueueActionTypes.STOP_TOKEN;
  constructor(public payload: { id: number }) {}
}

export class BacktoQueue implements Action {
  readonly type = QueueActionTypes.BACK_TO_QUEUE;
  constructor(public payload: { id: number }) {}
}

export class BackendSuccess implements Action {
  readonly type = QueueActionTypes.BACKEND_SUCCESS;
}

export class OnServerError implements Action {
  readonly type = QueueActionTypes.ON_SERVER_ERROR;
}

export type QueueActions =
  | LoadTokens
  | AddTokens
  | AddToken
  | RemoveToken
  | CallToken
  | CallNextToken
  | CallAgainToken
  | ServeToken
  | CompleteToken
  | StopToken
  | BacktoQueue
  | BackendSuccess
  | OnServerError;
