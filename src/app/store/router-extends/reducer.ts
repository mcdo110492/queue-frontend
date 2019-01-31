import { ActionTypes, Actions } from "./action";
import { State, initialState } from "./state";

export function routeLoaderreducer(
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
