import { Action } from "@ngrx/store";

export enum ActionTypes {
  START_NAVIGATING = "[ROUTE] Start Route",
  END_NAVIGATING = "[ROUTE] End Navigating"
}

export class StartNavigating implements Action {
  readonly type = ActionTypes.START_NAVIGATING;
}

export class EndNavigating implements Action {
  readonly type = ActionTypes.END_NAVIGATING;
}

export type Actions = StartNavigating | EndNavigating;
