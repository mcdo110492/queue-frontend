import { EntityAdapter, createEntityAdapter, EntityState } from "@ngrx/entity";
import { CounterModel } from "./../../models/counter.model";
import { CounterActions, CounterActionTypes } from "../actions/counter.actions";

export interface State extends EntityState<CounterModel> {
  selectedCounterId: number | string;
  isLoading: boolean;
  isSaving: boolean;
}

export const adapter: EntityAdapter<CounterModel> = createEntityAdapter<
  CounterModel
>();

export const initialState: State = adapter.getInitialState({
  selectedCounterId: null,
  isLoading: false,
  isSaving: false
});

export function reducer(state = initialState, action: CounterActions): State {
  switch (action.type) {
    case CounterActionTypes.LOAD_COUNTERS: {
      return { ...state, isLoading: true };
    }
    case CounterActionTypes.ADD_COUNTER: {
      return adapter.addOne(action.payload.counter, {
        ...state,
        isSaving: false
      });
    }
    case CounterActionTypes.ADD_COUNTERS: {
      return adapter.addMany(action.payload.counters, {
        ...state,
        isLoading: false
      });
    }
    case CounterActionTypes.UPDATE_COUNTER: {
      const { payload } = action;
      return adapter.updateOne(payload.counter, {
        ...state,
        isSaving: false
      });
    }
    case CounterActionTypes.CLEAR_COUNTERS: {
      return adapter.removeAll({ ...state, selectedCounterId: null });
    }
    case CounterActionTypes.CREATE_NEW_COUNTER_MODEL:
    case CounterActionTypes.UPDATE_COUNTER_MODEL: {
      return { ...state, isSaving: true };
    }
    case CounterActionTypes.SELECT_COUNTER_MODEL: {
      return { ...state, selectedCounterId: action.payload };
    }
    case CounterActionTypes.ON_SERVER_ERROR: {
      return { ...state, isSaving: false, isLoading: false };
    }
    default:
      return state;
  }
}

export const getSelectedCOunterId = (state: State) => state.selectedCounterId;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

export const selectCounterIds = selectIds;

export const selectCounterEntities = selectEntities;

export const selectAllCounters = selectAll;

export const selectCounterTotal = selectTotal;

export const selectIsLoading = (state: State) => state.isLoading;

export const selectIsSaving = (state: State) => state.isSaving;
