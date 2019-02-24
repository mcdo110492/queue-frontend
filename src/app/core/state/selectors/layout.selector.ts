import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from "@ngrx/store";

import {
  State,
  getIsToggle,
  getSidebarLinks
} from "../reducers/layout.reducer";

import { SideBarLinksModel } from "@core/models";

export const SelectLayoutState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>("layout");

export const SelectIsToggle: MemoizedSelector<object, boolean> = createSelector(
  SelectLayoutState,
  getIsToggle
);

export const SelectSidebarLinks: MemoizedSelector<
  object,
  SideBarLinksModel[]
> = createSelector(
  SelectLayoutState,
  getSidebarLinks
);
