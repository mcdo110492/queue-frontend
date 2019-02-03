import { EntityAdapter, createEntityAdapter, EntityState } from "@ngrx/entity";
import { CounterModel } from "./../../models/counter.model";
import { CounterActions, CounterActionTypes } from "../actions/counter.actions";

export interface State extends EntityState<CounterModel> {
  selectedCounterId: number | null;
  isLoading: boolean;
}

export const adapter: EntityAdapter<CounterModel> = createEntityAdapter<
  CounterModel
>();

export const initialState: State = adapter.getInitialState({
  selectedCounterId: null,
  isLoading: false
});

export function reducer(state = initialState, action: CounterActions): State {
  switch (action.type) {
    case CounterActionTypes.LOAD_COUNTERS: {
      return { ...state, isLoading: true };
    }
    case CounterActionTypes.ADD_COUNTER: {
      return adapter.addOne(action.payload.counter, state);
    }
    case CounterActionTypes.ADD_COUNTERS: {
      return adapter.addMany(action.payload.counters, {
        ...state,
        isLoading: false
      });
    }
    case CounterActionTypes.UPDATE_COUNTER: {
      return adapter.updateOne(action.payload.counter, state);
    }
    case CounterActionTypes.CLEAR_COUNTERS: {
      return adapter.removeAll({ ...state, selectedCounterId: null });
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
