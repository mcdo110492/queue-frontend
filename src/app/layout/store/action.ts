import { Action } from "@ngrx/store";

export enum ActionTypes {
  TOGGLE_SIDENAV = "[SIDENAV] Toggle Sidenav",
  SIDEBAR_LINKS = "[SIDENAV] Sidebar Links"
}

export class ToggleSidenav implements Action {
  readonly type = ActionTypes.TOGGLE_SIDENAV;
}

export type Actions = ToggleSidenav;
