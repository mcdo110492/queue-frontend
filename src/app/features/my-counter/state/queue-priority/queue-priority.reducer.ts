import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { TokenModel } from "@features/my-counter/models/token.model";

import {
  QueuePriorityActions,
  QueuePriorityActionTypes
} from "./queue-priority.actions";

export interface State extends EntityState<TokenModel> {
  isLoading: boolean;
}

export const adapter: EntityAdapter<TokenModel> = createEntityAdapter<
  TokenModel
>();

export const initialState: State = adapter.getInitialState({
  isLoading: false
});

export function reducer(
  state = initialState,
  action: QueuePriorityActions
): State {
  switch (action.type) {
    case QueuePriorityActionTypes.LOAD_QUEUE_PRIORITIES:
    case QueuePriorityActionTypes.CALL_PRIORITY:
    case QueuePriorityActionTypes.BACK_TO_PRIORITY: {
      return { ...state, isLoading: true };
    }

    case QueuePriorityActionTypes.ADD_QUEUE_PRIORITIES: {
      return adapter.addAll(action.payload.queuePriorities, {
        ...state,
        isLoading: false
      });
    }

    case QueuePriorityActionTypes.ADD_QUEUE_PRIORITY: {
      return adapter.addOne(action.payload.queuePriority, {
        ...state,
        isLoading: false
      });
    }

    case QueuePriorityActionTypes.REMOVE_QUEUE_PRIORITY: {
      return adapter.removeOne(action.payload.id, {
        ...state,
        isLoading: false
      });
    }

    case QueuePriorityActionTypes.ON_SERVER_ERROR: {
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
