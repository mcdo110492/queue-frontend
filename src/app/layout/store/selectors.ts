import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from "@ngrx/store";
import { State } from "./state";
import { SidenavMetadataModel } from "./../models";
import { ADMINISTRATOR_LINKS } from "./../metadata/administrator.nav";
import { selectUserRole } from "@user-store/store/selector";

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

export const selectSidebarLinksByRole: MemoizedSelector<
  object,
  SidenavMetadataModel[]
> = createSelector(
  selectUserRole,
  role => {
    if (role === 1) {
      return ADMINISTRATOR_LINKS;
    }
  }
);
