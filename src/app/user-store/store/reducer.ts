import { ActionTypes, Actions } from "./action";
import { State, initialState } from "./state";

export function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.ADD_USER_CREDENTIALS: {
      return { ...state, credentials: action.payload };
    }
    case ActionTypes.REMOVE_USER_CREDENTIALS: {
      const credentials = initialState.credentials;
      return { ...state, credentials };
    }

    default: {
      return state;
    }
  }
}
