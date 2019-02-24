import { Action } from "@ngrx/store";
import { SideBarLinksModel } from "@core/models";

export enum ActionTypes {
  TOGGLE_SIDENAV = "[SIDEBAR] Toggle Sidenav",
  CREATE_lINKS = "[SIDEBAR] CreateLinks",
  ADD_SIDEBAR_LINKS = "[SIDEBAR] Sidebar Links"
}

export class ToggleSidenav implements Action {
  readonly type = ActionTypes.TOGGLE_SIDENAV;
}

export class CreateLinks implements Action {
  readonly type = ActionTypes.CREATE_lINKS;
}

export class AddSideBarLinks implements Action {
  readonly type = ActionTypes.ADD_SIDEBAR_LINKS;
  constructor(public payload: SideBarLinksModel[]) {}
}

export type Actions = ToggleSidenav | CreateLinks | AddSideBarLinks;
