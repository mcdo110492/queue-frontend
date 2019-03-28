import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { TokenModel } from "@features/my-counter/models/token.model";
import { QueueActions, QueueActionTypes } from "./queue.actions";

export interface State extends EntityState<TokenModel> {
  isLoading: boolean;
}

export const adapter: EntityAdapter<TokenModel> = createEntityAdapter<
  TokenModel
>();

export const initialState: State = adapter.getInitialState({
  isLoading: false
});

export function reducer(state = initialState, action: QueueActions): State {
  switch (action.type) {
    case QueueActionTypes.LOAD_TOKENS:
    case QueueActionTypes.CALL_TOKEN:
    case QueueActionTypes.CALL_AGAIN_TOKEN:
    case QueueActionTypes.SERVE_TOKEN:
    case QueueActionTypes.COMPLETE_TOKEN:
    case QueueActionTypes.STOP_TOKEN:
    case QueueActionTypes.BACK_TO_QUEUE_TOKEN: {
      return { ...state, isLoading: true };
    }

    case QueueActionTypes.ADD_TOKEN: {
      return adapter.addOne(action.payload.queue, {
        ...state,
        isLoading: false
      });
    }

    case QueueActionTypes.ADD_TOKENS: {
      return adapter.addAll(action.payload.queues, {
        ...state,
        isLoading: false
      });
    }

    case QueueActionTypes.REMOVE_TOKEN: {
      return adapter.removeOne(action.payload.id, {
        ...state,
        isLoading: false
      });
    }

    case QueueActionTypes.ON_SERVER_SUCCESS:
    case QueueActionTypes.ON_SERVER_ERROR: {
      return { ...state, isLoading: false };
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

export const getIsLoading = (state: State) => state.isLoading;
