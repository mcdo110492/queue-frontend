import { createSelector } from "@ngrx/store";

import * as fromMyCounterReducer from "../reducers";
import * as fromQueueReducer from "../reducers/queue.reducer";

const selectQueueState = fromMyCounterReducer.selectQueueState;

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

export const selectNowServing = createSelector(
  selectQueueState,
  fromQueueReducer.getNowServing
);

export const selectNowServingEntity = createSelector(
  selectQueueEntities,
  selectNowServing,
  (entities, nowServing) => entities[nowServing]
);

export const selectIsTokenLoading = createSelector(
  selectQueueState,
  fromQueueReducer.getIsTokenLoading
);

export const selectIsProcessing = createSelector(
  selectQueueState,
  fromQueueReducer.getIsProcessing
);
