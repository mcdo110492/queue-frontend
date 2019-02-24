import { createSelector } from "@ngrx/store";
import * as fromDisplayReducer from "./../reducers";
import * as fromMediaReducer from "./../reducers/media.reducer";

const selectMediaState = (state: fromDisplayReducer.DisplayState) =>
  state.media;

export const selectMedia = createSelector(
  fromDisplayReducer.selectDisplayState,
  selectMediaState
);

export const selectIsLoading = createSelector(
  selectMedia,
  fromMediaReducer.selectIsLoading
);

export const selectIsLoaded = createSelector(
  selectMedia,
  fromMediaReducer.selectIsLoaded
);

export const selectSources = createSelector(
  selectMedia,
  fromMediaReducer.selectSources
);
