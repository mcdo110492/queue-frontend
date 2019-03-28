import { createSelector } from "@ngrx/store";

import * as fromRootReducer from "@features/my-counter/state";
import * as fromQueueReducer from "./queue.reducer";

const selectQueueState = fromRootReducer.selectQueueState;

export const selectQueueIds = createSelector(
  selectQueueState,
  fromQueueReducer.selectIds
);

export const selectQueueEntities = createSelector(
  selectQueueState,
  fromQueueReducer.selectEntities
);

export const selectAllQueue = createSelector(
  selectQueueState,
  fromQueueReducer.selectAll
);

export const selectQueueTotal = createSelector(
  selectQueueState,
  fromQueueReducer.selectTotal
);

export const selectIsLoading = createSelector(
  selectQueueState,
  fromQueueReducer.getIsLoading
);

export const selectFirstQueue = createSelector(
  selectAllQueue,
  allQueue => {
    return allQueue.length == 0
      ? { id: 0, ticket_number: 0, priority: 0, status: 0, date_issued: null }
      : allQueue[0];
  }
);
