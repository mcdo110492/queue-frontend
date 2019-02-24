import { ActionTypes, Actions } from "../actions/router-extends.action";

export interface State {
  isRouteLoading: boolean;
}

const initialState: State = {
  isRouteLoading: false
};

export function routerExtendsReducer(
  state = initialState,
  action: Actions
): State {
  switch (action.type) {
    case ActionTypes.START_NAVIGATING:
      return { ...state, isRouteLoading: true };
      break;
    case ActionTypes.END_NAVIGATING:
      return { ...state, isRouteLoading: false };
      break;

    default:
      return state;
      break;
  }
}

export const isRouteLoading = (state: State) => state.isRouteLoading;
