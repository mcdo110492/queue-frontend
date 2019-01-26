import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from "@ngrx/store";
import { State } from "./state";

const getIsToggle = (state: State): boolean => state.isToggle;

export const SelectLayoutState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>("layout");

export const selectLayoutSidenavIsToggle: MemoizedSelector<
  object,
  boolean
> = createSelector(
  SelectLayoutState,
  getIsToggle
);
