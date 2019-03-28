import { Action } from "@ngrx/store";
import { TokenModel } from "@features/my-counter/models/token.model";

export enum QueuePriorityActionTypes {
  LOAD_QUEUE_PRIORITIES = "[QUEUEPRIORITY] Load QueuePriorities",
  CALL_PRIORITY = "[QUEUEPRIORITY] Call Priority",
  ADD_QUEUE_PRIORITIES = "[QUEUEPRIORITY] Add QueuePriorities",
  ADD_QUEUE_PRIORITY = "[QUEUEPRIORITY] Add QueuePriority",
  REMOVE_QUEUE_PRIORITY = "[QUEUEPRIORITY] Add Remove Priority",
  ON_SERVER_ERROR = "[QUEUEPRIORITY] On Server Error Priority",
  BACK_TO_PRIORITY = "[QUEUEPRIORITY] Back To Priority"
}

export class LoadQueuePriorities implements Action {
  readonly type = QueuePriorityActionTypes.LOAD_QUEUE_PRIORITIES;
}

export class CallPriority implements Action {
  readonly type = QueuePriorityActionTypes.CALL_PRIORITY;
  constructor(public payload: { token: TokenModel }) {}
}

export class AddQueuePriority implements Action {
  readonly type = QueuePriorityActionTypes.ADD_QUEUE_PRIORITY;

  constructor(public payload: { queuePriority: TokenModel }) {}
}

export class AddQueuePriorities implements Action {
  readonly type = QueuePriorityActionTypes.ADD_QUEUE_PRIORITIES;
  constructor(public payload: { queuePriorities: TokenModel[] }) {}
}

export class RemoveQueuePriority implements Action {
  readonly type = QueuePriorityActionTypes.REMOVE_QUEUE_PRIORITY;
  constructor(public payload: { id: number }) {}
}

export class BackToPriority implements Action {
  readonly type = QueuePriorityActionTypes.BACK_TO_PRIORITY;
  constructor(public payload: { token: TokenModel }) {}
}

export class OnServerError implements Action {
  readonly type = QueuePriorityActionTypes.ON_SERVER_ERROR;
  constructor(public payload: any) {}
}

export type QueuePriorityActions =
  | LoadQueuePriorities
  | CallPriority
  | AddQueuePriority
  | AddQueuePriorities
  | RemoveQueuePriority
  | BackToPriority
  | OnServerError;
