import { EntityAdapter, createEntityAdapter, EntityState } from "@ngrx/entity";

import { IssueTokenModel } from "@features/issue-token/models";

import {
  IssueTokenActions,
  IssueTokenActionTypes
} from "../actions/issue-token.actions";

export interface State {
  isSaving: boolean;
  lastGeneratedToken: IssueTokenModel;
}

export const initialState: State = {
  isSaving: false,
  lastGeneratedToken: {
    id: 0,
    ticket_number: 9999999,
    priority: 1,
    people_in_waiting: 10,
    estimated_waiting_time: "10",
    date_issued: new Date(),
    created_at: new Date()
  }
};

export function reducer(
  state = initialState,
  action: IssueTokenActions
): State {
  switch (action.type) {
    case IssueTokenActionTypes.GET_ISSUE_TOKEN: {
      return { ...state, isSaving: true };
    }
    case IssueTokenActionTypes.ISSUE_TOKEN_SUCCESS: {
      const payload = action.payload;
      return { ...state, isSaving: false, lastGeneratedToken: payload };
    }

    default:
      return state;
  }
}

export const selectIsSaving = (state: State) => state.isSaving;

export const selectLastGeneratedToken = (state: State) =>
  state.lastGeneratedToken;
