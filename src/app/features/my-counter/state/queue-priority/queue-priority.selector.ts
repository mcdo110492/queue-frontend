import { createSelector } from "@ngrx/store";

import * as fromRootReducer from "@features/my-counter/state";
import * as fromQueuePriorityReducer from "./queue-priority.reducer";

const selectQueuePriorityState = fromRootReducer.selectQueuePriorityState;

export const selectQueuePriorityIds = createSelector(
  selectQueuePriorityState,
  fromQueuePriorityReducer.selectIds
);

export const selectQueuePriorityEntities = createSelector(
  selectQueuePriorityState,
  fromQueuePriorityReducer.selectEntities
);

export const selectAllQueuePriority = createSelector(
  selectQueuePriorityState,
  fromQueuePriorityReducer.selectAll
);

export const selectQueuePriorityTotal = createSelector(
  selectQueuePriorityState,
  fromQueuePriorityReducer.selectTotal
);

export const selectIsLoading = createSelector(
  selectQueuePriorityState,
  fromQueuePriorityReducer.getIsLoading
);

export const selectFirstQueuePriority = createSelector(
  selectAllQueuePriority,
  allPriority => {
    return allPriority.length == 0
      ? { id: 0, ticket_number: 0, priority: 0, status: 0, date_issued: null }
      : allPriority[0];
  }
);
