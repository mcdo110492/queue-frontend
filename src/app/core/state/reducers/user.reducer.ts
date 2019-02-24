import { ActionTypes, Actions } from "./../actions/user.action";
import { UserStateModel } from "@core/models";

export interface State {
  isAuthenticating: boolean;
  credentials: UserStateModel;
}

export const initialState: State = {
  isAuthenticating: false,
  credentials: {
    id: 0,
    username: null,
    name: null,
    role: 0,
    token: null,
    image_path: "default.jpg"
  }
};

export function userReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.AUTHENTICATE: {
      return { ...state, isAuthenticating: true };
    }
    case ActionTypes.ADD_USER_CREDENTIALS: {
      return { ...state, credentials: action.payload, isAuthenticating: false };
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

export const getIsAuthenticating = (state: State) => state.isAuthenticating;
export const getUsername = (state: State) => state.credentials.username;
export const getName = (state: State) => state.credentials.name;
export const getRole = (state: State) => state.credentials.role;
export const getToken = (state: State) => state.credentials.token;
export const getImagePath = (state: State) => state.credentials.image_path;
