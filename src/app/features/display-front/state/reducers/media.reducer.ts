import { MediaActions, MediaActionTypes } from "../actions/media.actions";
import { MediaModel } from "@features/display-front/models/media.model";

export interface State {
  isLoading: boolean;
  isLoaded: boolean;
  sources: MediaModel[];
}

export const initialState: State = {
  isLoading: false,
  isLoaded: false,
  sources: []
};

export function reducer(state = initialState, action: MediaActions): State {
  switch (action.type) {
    case MediaActionTypes.LoadMedias: {
      return { ...state, isLoading: true };
    }
    case MediaActionTypes.LoadedMedias: {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        sources: action.payload
      };
    }
    case MediaActionTypes.OnServerError: {
      return { ...state, isLoading: false };
    }
    default:
      return state;
  }
}

export const selectIsLoading = (state: State) => state.isLoading;
export const selectIsLoaded = (state: State) => state.isLoaded;
export const selectSources = (state: State) => state.sources;
