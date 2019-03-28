import { Action } from "@ngrx/store";
import { TokenModel } from "@features/my-counter/models/token.model";

export enum QueueActionTypes {
  LOAD_TOKENS = "[QUEUE] Load Token",
  ADD_TOKEN = "[QUEUE] Add Token",
  ADD_TOKENS = "[QUEUE] Add Tokens",
  REMOVE_TOKEN = "[QUEUE] Remove Token",
  CALL_NEXT = "[QUEUE] Call Next",
  CALL_TOKEN = "[QUEUE] Call Token",
  CALL_AGAIN_TOKEN = "[QUEUE] Call Again Token",
  SERVE_TOKEN = "[QUEUE] Serve Token",
  COMPLETE_TOKEN = "[QUEUE] Complete Token",
  STOP_TOKEN = "[QUEUE] Stop Token",
  BACK_TO_QUEUE_TOKEN = "[QUEUE] Back To Queue Token",
  ON_SERVER_SUCCESS = "[QUEUE] On Server Success",
  ON_SERVER_ERROR = "[QUEUE] On Server Error"
}

export class LoadTokens implements Action {
  readonly type = QueueActionTypes.LOAD_TOKENS;
}

export class AddToken implements Action {
  readonly type = QueueActionTypes.ADD_TOKEN;
  constructor(public payload: { queue: TokenModel }) {}
}

export class AddTokens implements Action {
  readonly type = QueueActionTypes.ADD_TOKENS;

  constructor(public payload: { queues: TokenModel[] }) {}
}

export class RemoveToken implements Action {
  readonly type = QueueActionTypes.REMOVE_TOKEN;

  constructor(public payload: { id: number }) {}
}

export class CallNext implements Action {
  readonly type = QueueActionTypes.CALL_NEXT;
}

export class CallToken implements Action {
  readonly type = QueueActionTypes.CALL_TOKEN;
  constructor(public payload: { token: TokenModel }) {}
}

export class CallTokenAgain implements Action {
  readonly type = QueueActionTypes.CALL_AGAIN_TOKEN;
  constructor(public payload: { token: TokenModel }) {}
}

export class ServeToken implements Action {
  readonly type = QueueActionTypes.SERVE_TOKEN;
  constructor(public payload: { token: TokenModel }) {}
}

export class CompleteToken implements Action {
  readonly type = QueueActionTypes.COMPLETE_TOKEN;
  constructor(public payload: { token: TokenModel }) {}
}

export class StopToken implements Action {
  readonly type = QueueActionTypes.STOP_TOKEN;
  constructor(public payload: { token: TokenModel }) {}
}

export class BackToQueueToken implements Action {
  readonly type = QueueActionTypes.BACK_TO_QUEUE_TOKEN;
  constructor(public payload: { token: TokenModel }) {}
}

export class OnServerSuccess implements Action {
  readonly type = QueueActionTypes.ON_SERVER_SUCCESS;
  constructor(public payload: any) {}
}

export class OnServerError implements Action {
  readonly type = QueueActionTypes.ON_SERVER_ERROR;
  constructor(public payload: any) {}
}

export type QueueActions =
  | LoadTokens
  | AddToken
  | AddTokens
  | RemoveToken
  | CallNext
  | CallToken
  | CallTokenAgain
  | ServeToken
  | CompleteToken
  | StopToken
  | BackToQueueToken
  | OnServerSuccess
  | OnServerError;
