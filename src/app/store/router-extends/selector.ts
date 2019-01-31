import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from "@ngrx/store";
import { State } from "./state";

const getIsRouteLoading = (state: State) => state.isRouteLoading;

export const SelectRouteLoaderState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>("routeLoader");

export const SelectIsRouteLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  SelectRouteLoaderState,
  getIsRouteLoading
);
