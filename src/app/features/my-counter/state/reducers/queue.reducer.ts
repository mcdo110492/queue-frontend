import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

import { TokenModel } from "@features/my-counter/models/token.model";

import { QueueActionTypes, QueueActions } from "../actions/queue.actions";

export interface State extends EntityState<TokenModel> {
  nowServing: number;
  isProcessing: boolean;
  isTokenLoading: boolean;
}

export const adapter: EntityAdapter<TokenModel> = createEntityAdapter<
  TokenModel
>();

export const initialState: State = adapter.getInitialState({
  nowServing: 0,
  isProcessing: false,
  isTokenLoading: false
});

export function reducer(state = initialState, action: QueueActions): State {
  switch (action.type) {
    case QueueActionTypes.LOAD_TOKENS: {
      return { ...state, isTokenLoading: true };
    }
    case QueueActionTypes.ADD_TOKEN: {
      return adapter.addOne(action.payload.token, state);
    }

    case QueueActionTypes.ADD_TOKENS: {
      return adapter.addMany(action.payload.tokens, {
        ...state,
        isTokenLoading: false
      });
    }

    case QueueActionTypes.REMOVE_TOKEN: {
      return adapter.removeOne(action.payload.id, state);
    }

    case QueueActionTypes.CALL_TOKEN: {
      return { ...state, nowServing: action.payload.id };
    }
    case QueueActionTypes.SERVE_TOKEN:
    case QueueActionTypes.COMPLETE_TOKEN:
    case QueueActionTypes.STOP_TOKEN: {
      return { ...state, isProcessing: true };
    }
    case QueueActionTypes.BACK_TO_QUEUE: {
      return { ...state, nowServing: 0, isProcessing: true };
    }
    case QueueActionTypes.BACKEND_SUCCESS:
    case QueueActionTypes.ON_SERVER_ERROR: {
      return { ...state, isProcessing: false, isTokenLoading: false };
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

export const getNowServing = (state: State) => state.nowServing;
export const getIsProcessing = (state: State) => state.isProcessing;
export const getIsTokenLoading = (state: State) => state.isTokenLoading;
