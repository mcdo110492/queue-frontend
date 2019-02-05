import { EntityAdapter, createEntityAdapter, EntityState } from "@ngrx/entity";
import { CounterUserModel } from "./../../models/counter-user.model";
import {
  CounterUserActions,
  CounterUserActionTypes
} from "../actions/counter-user.actions";
import { CounterModel } from "@features/counter/models";
import { UserModel } from "@user-store/models";

export interface State extends EntityState<CounterUserModel> {
  selectedCounterUserId: number | string;
  isLoading: boolean;
  isSaving: boolean;
  counterOptions: CounterModel[];
  userOptions: UserModel[];
}

export const adapter: EntityAdapter<CounterUserModel> = createEntityAdapter<
  CounterUserModel
>();

export const initialState: State = adapter.getInitialState({
  selectedCounterUserId: null,
  isLoading: false,
  isSaving: false,
  counterOptions: [],
  userOptions: []
});

export function reducer(
  state = initialState,
  action: CounterUserActions
): State {
  switch (action.type) {
    case CounterUserActionTypes.LOAD_COUNTER_USERS: {
      return { ...state, isLoading: true };
    }
    case CounterUserActionTypes.ADD_COUNTER_USER: {
      return adapter.addOne(action.payload.counter, {
        ...state,
        isSaving: false
      });
    }
    case CounterUserActionTypes.ADD_COUNTER_USERS: {
      return adapter.addMany(action.payload.counters, {
        ...state,
        isLoading: false
      });
    }
    case CounterUserActionTypes.UPDATE_COUNTER_USER: {
      const { payload } = action;
      return adapter.updateOne(payload.counter, {
        ...state,
        isSaving: false
      });
    }
    case CounterUserActionTypes.CLEAR_COUNTER_USERS: {
      return adapter.removeAll({ ...state, selectedCounterUserId: null });
    }
    case CounterUserActionTypes.CREATE_NEW_COUNTER_USER_MODEL:
    case CounterUserActionTypes.UPDATE_COUNTER_USER_MODEL: {
      return { ...state, isSaving: true };
    }
    case CounterUserActionTypes.SELECT_COUNTER_USER_MODEL: {
      return { ...state, selectedCounterUserId: action.payload };
    }
    case CounterUserActionTypes.ON_SERVER_ERROR: {
      return { ...state, isSaving: false, isLoading: false };
    }
    case CounterUserActionTypes.ADD_COUNTER_OPTIONS: {
      const { payload } = action;
      return { ...state, counterOptions: payload };
    }
    case CounterUserActionTypes.ADD_USER_OPTIONS: {
      const { payload } = action;
      return { ...state, userOptions: payload };
    }
    default:
      return state;
  }
}

export const getSelectedCounterUserId = (state: State) =>
  state.selectedCounterUserId;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

export const selectCounterUserIds = selectIds;

export const selectCounterUserEntities = selectEntities;

export const selectAllCounterUsers = selectAll;

export const selectCounterUsersTotal = selectTotal;

export const selectIsLoading = (state: State) => state.isLoading;

export const selectIsSaving = (state: State) => state.isSaving;

export const selectCounterOptions = (state: State) => state.counterOptions;

export const selectUserOptions = (state: State) => state.userOptions;
