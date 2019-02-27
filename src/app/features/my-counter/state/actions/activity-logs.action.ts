import { Action } from "@ngrx/store";

import { ActivityLogModel } from "@features/my-counter/models/activity-logs.model";

export enum ActivityLogActionTypes {
  LOAD_ACTIVITY_LOGS = "[MYCOUNTER] Load Activity Logs",
  ADD_ACTIVITY_LOG = "[MYCOUNTER] Add Activity Log",
  ADD_ACTIVITY_LOGS = "[MYCOUNTER] Add Activity Logs",
  ON_SERVER_ERROR = "[MYCOUNTER] On Server Error"
}

export class LoadActivityLogs implements Action {
  readonly type = ActivityLogActionTypes.LOAD_ACTIVITY_LOGS;
}

export class AddActivityLog implements Action {
  readonly type = ActivityLogActionTypes.ADD_ACTIVITY_LOG;
  constructor(public payload: { logs: ActivityLogModel }) {}
}

export class AddActivityLogs implements Action {
  readonly type = ActivityLogActionTypes.ADD_ACTIVITY_LOGS;
  constructor(public payload: { logs: ActivityLogModel[] }) {}
}

export class OnServerError implements Action {
  readonly type = ActivityLogActionTypes.ON_SERVER_ERROR;
}

export type ActivityLogsActions =
  | LoadActivityLogs
  | AddActivityLog
  | AddActivityLogs
  | OnServerError;
