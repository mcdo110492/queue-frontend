import { EntityAdapter, createEntityAdapter, EntityState } from "@ngrx/entity";
import { IMediaModel } from "../../models/media.model";
import {
  MediaDisplayActionTypes,
  MediaDisplayActions
} from "../actions/media-display.action";

export interface State extends EntityState<IMediaModel> {
  isLoading: boolean;
}

export const adapter: EntityAdapter<IMediaModel> = createEntityAdapter<
  IMediaModel
>();

export const initialState: State = adapter.getInitialState({
  isLoading: false
});

export function reducer(
  state = initialState,
  action: MediaDisplayActions
): State {
  switch (action.type) {
    case MediaDisplayActionTypes.LOAD_MEDIA: {
      return { ...state, isLoading: true };
    }
    case MediaDisplayActionTypes.ADD_MEDIAS: {
      return adapter.addMany(action.payload.medias, {
        ...state,
        isLoading: false
      });
    }
    case MediaDisplayActionTypes.ON_SERVER_ERROR: {
      return { ...state, isLoading: false };
    }
    default:
      return state;
  }
}

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

export const selectMediaIds = selectIds;

export const selectMediaEntities = selectEntities;

export const selectAllMedias = selectAll;

export const selectMediaTotal = selectTotal;

export const selectIsLoading = (state: State) => state.isLoading;
