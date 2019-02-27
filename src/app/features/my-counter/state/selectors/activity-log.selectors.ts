import { createSelector } from "@ngrx/store";

import * as fromMyCounterReducer from "../reducers";
import * as fromActivityLogsReducer from "../reducers/activity-logs.reducer";

const selectActivityLogsState = fromMyCounterReducer.selectActivityLogsState;

export const selectActivityLogIds = createSelector(
  selectActivityLogsState,
  fromActivityLogsReducer.selectIds
);

export const selectActivityLogEntities = createSelector(
  selectActivityLogsState,
  fromActivityLogsReducer.selectEntities
);

export const selectAllActivityLog = createSelector(
  selectActivityLogsState,
  fromActivityLogsReducer.selectAll
);

export const selectActivityLogTotal = createSelector(
  selectActivityLogsState,
  fromActivityLogsReducer.selectTotal
);

export const selectIsLogLoading = createSelector(
  selectActivityLogsState,
  fromActivityLogsReducer.getIsLogLoading
);
