import { createSelector } from "@ngrx/store";

import * as fromRootReducers from "@features/my-counter/state";
import * as fromActivityLogsReducer from "./activity-logs.reducer";

const selectActivityLogsState = fromRootReducers.selectActivityLogsState;

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
