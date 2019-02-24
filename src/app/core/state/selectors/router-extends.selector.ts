import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from "@ngrx/store";

import { State, isRouteLoading } from "../reducers/router-extends.reducer";

export const SelectRouteLoader: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>("route-loader");

export const SelectIsRouteLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  SelectRouteLoader,
  isRouteLoading
);
