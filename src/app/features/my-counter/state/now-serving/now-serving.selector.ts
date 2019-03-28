import { createSelector } from "@ngrx/store";

import * as fromRootReducer from "@features/my-counter/state";
import * as fromNowServingReducer from "./now-serving.reducer";

import { TokenModel } from "@features/my-counter/models";

const selectNowServingState = fromRootReducer.selectNowServingState;

export const selectNowServingIds = createSelector(
  selectNowServingState,
  fromNowServingReducer.selectIds
);

export const selectNowServingEntities = createSelector(
  selectNowServingState,
  fromNowServingReducer.selectEntities
);

export const selectedNowServingId = createSelector(
  selectNowServingState,
  fromNowServingReducer.getCurrentNowServing
);

export const selectedNowServing = createSelector(
  selectNowServingEntities,
  selectedNowServingId,
  (entities, id) => {
    if (id) {
      return entities[id];
    }

    const data: TokenModel = {
      id: 0,
      ticket_number: 0,
      priority: 0,
      status: 0,
      date_issued: null
    };
    return data;
  }
);
