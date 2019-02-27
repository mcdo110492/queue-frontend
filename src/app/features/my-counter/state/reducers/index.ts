import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from "@ngrx/store";

import * as fromQueueReducer from "./queue.reducer";
import * as fromActivityLogsReducer from "./activity-logs.reducer";

export interface State {
  queue: any;
  activityLogs: any;
}

export const reducers: ActionReducerMap<State> = {
  queue: fromQueueReducer.reducer,
  activityLogs: fromActivityLogsReducer.reducer
};

export const selectMyCounterState = createFeatureSelector<State>("myCounter");

const getQueueState = (state: State) => state.queue;
const getActivityLogsState = (state: State) => state.activityLogs;

export const selectQueueState = createSelector(
  selectMyCounterState,
  getQueueState
);

export const selectActivityLogsState = createSelector(
  selectMyCounterState,
  getActivityLogsState
);
