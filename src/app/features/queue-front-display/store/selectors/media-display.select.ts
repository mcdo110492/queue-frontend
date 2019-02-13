import { createSelector } from "@ngrx/store";
import * as fromRootReducer from "./../reducers";
import * as fromMedia from "./../reducers/media-display.reducer";

export const selectMediaState = fromRootReducer.selectMediaState;

export const selectMediaIds = createSelector(
  selectMediaState,
  fromMedia.selectMediaIds
);

export const selectMediaEntities = createSelector(
  selectMediaState,
  fromMedia.selectMediaEntities
);

export const selectAllMedia = createSelector(
  selectMediaState,
  fromMedia.selectAllMedias
);

export const selectMediaTotal = createSelector(
  selectMediaState,
  fromMedia.selectMediaTotal
);

export const selectMediaIsLoading = createSelector(
  selectMediaState,
  fromMedia.selectIsLoading
);
