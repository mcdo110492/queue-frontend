import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromCounter from "./../reducers/counter.reducer";

export const selectCounterState = createFeatureSelector<fromCounter.State>(
  "counter"
);

export const selectCounterIds = createSelector(
  selectCounterState,
  fromCounter.selectCounterIds
);

export const selectCounterEntities = createSelector(
  selectCounterState,
  fromCounter.selectCounterEntities
);

export const selectAllCounter = createSelector(
  selectCounterState,
  fromCounter.selectAllCounters
);

export const selectCounterTotal = createSelector(
  selectCounterState,
  fromCounter.selectCounterTotal
);

export const selectCurrentCounterId = createSelector(
  selectCounterState,
  fromCounter.getSelectedCOunterId
);

export const selectCurrentCounter = createSelector(
  selectCounterEntities,
  selectCurrentCounterId,
  (counterEntities, counterId) => counterEntities[counterId]
);

export const selectCounterIsLoading = createSelector(
  selectCounterState,
  fromCounter.selectIsLoading
);

export const selectCounterIsSaving = createSelector(
  selectCounterState,
  fromCounter.selectIsSaving
);
