import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from "@ngrx/store";
import * as fromMediaReducer from "./media-display.reducer";

export interface State {
  media: any;
}

export const reducers: ActionReducerMap<State> = {
  media: fromMediaReducer.reducer
};

export const selectDisplayState = createFeatureSelector<State>("display");

const selectMediaReducer = (state: State) => state.media;
export const selectMediaState = createSelector(
  selectDisplayState,
  selectMediaReducer
);
