import { Actions, ActionTypes } from "./action";
import { initialState, State } from "./state";

export function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.TOGGLE_SIDENAV: {
      return { ...state, isToggle: !state.isToggle };
    }
    default: {
      return state;
    }
  }
}
