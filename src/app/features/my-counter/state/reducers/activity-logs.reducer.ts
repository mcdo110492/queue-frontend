import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

import { ActivityLogModel } from "@features/my-counter/models/activity-logs.model";

import {
  ActivityLogActionTypes,
  ActivityLogsActions
} from "../actions/activity-logs.action";

export interface State extends EntityState<ActivityLogModel> {
  isLogLoading: boolean;
}

export const adapter: EntityAdapter<ActivityLogModel> = createEntityAdapter<
  ActivityLogModel
>();

export const initialState: State = adapter.getInitialState({
  isLogLoading: false
});

export function reducer(
  state = initialState,
  action: ActivityLogsActions
): State {
  switch (action.type) {
    case ActivityLogActionTypes.LOAD_ACTIVITY_LOGS: {
      return { ...state, isLogLoading: true };
    }
    case ActivityLogActionTypes.ADD_ACTIVITY_LOG: {
      return adapter.addOne(action.payload.logs, state);
    }

    case ActivityLogActionTypes.ADD_ACTIVITY_LOGS: {
      return adapter.addMany(action.payload.logs, {
        ...state,
        isLogLoading: false
      });
    }

    case ActivityLogActionTypes.ON_SERVER_ERROR: {
      return { ...state, isLogLoading: false };
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

export const getIsLogLoading = (state: State) => state.isLogLoading;
