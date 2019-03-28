import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from "@ngrx/store";

import * as fromQueueReducer from "./queue/queue.reducer";
import * as fromQueuePriorityReducer from "./queue-priority/queue-priority.reducer";
import * as fromNowServingReducer from "./now-serving/now-serving.reducer";
import * as fromActivityLogsReducer from "./activity-logs/activity-logs.reducer";

export interface State {
  queue: any;
  queuePriority: any;
  nowServing: any;
  activityLogs: any;
}

export const reducers: ActionReducerMap<State> = {
  queue: fromQueueReducer.reducer,
  queuePriority: fromQueuePriorityReducer.reducer,
  nowServing: fromNowServingReducer.reducer,
  activityLogs: fromActivityLogsReducer.reducer
};

export const selectMyCounterState = createFeatureSelector<State>("myCounter");

const getQueueState = (state: State) => state.queue;
const getQueuePriorityState = (state: State) => state.queuePriority;
const getNowServingState = (state: State) => state.nowServing;
const getActivityLogsState = (state: State) => state.activityLogs;

export const selectQueueState = createSelector(
  selectMyCounterState,
  getQueueState
);

export const selectQueuePriorityState = createSelector(
  selectMyCounterState,
  getQueuePriorityState
);

export const selectNowServingState = createSelector(
  selectMyCounterState,
  getNowServingState
);

export const selectActivityLogsState = createSelector(
  selectMyCounterState,
  getActivityLogsState
);
