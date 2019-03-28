import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { TokenModel } from "@features/my-counter/models/token.model";
import {
  NowServingActions,
  NowServingActionTypes
} from "./now-serving.actions";

export interface State extends EntityState<TokenModel> {
  currentNowServing: number;
}

export const adapter: EntityAdapter<TokenModel> = createEntityAdapter<
  TokenModel
>();

export const initialState: State = adapter.getInitialState({
  currentNowServing: 0
});

export function reducer(
  state = initialState,
  action: NowServingActions
): State {
  switch (action.type) {
    case NowServingActionTypes.ADD_NOW_SERVING: {
      return adapter.addOne(action.payload.token, {
        ...state,
        currentNowServing: action.payload.token.id
      });
    }

    case NowServingActionTypes.REMOVE_NOW_SERVING: {
      return adapter.removeOne(action.payload.id, {
        ...state,
        currentNowServing: 0
      });
    }

    default: {
      return state;
    }
  }
}

export const { selectIds, selectEntities, selectAll } = adapter.getSelectors();

export const getCurrentNowServing = (state: State) => state.currentNowServing;
