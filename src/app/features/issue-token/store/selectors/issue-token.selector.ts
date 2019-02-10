import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromIssueToken from "./../reducers/issue-token.reducer";

export const selectIssueTokenState = createFeatureSelector<
  fromIssueToken.State
>("issue-token");

export const selectIssueTokenIsSaving = createSelector(
  selectIssueTokenState,
  fromIssueToken.selectIsSaving
);

export const selectLastGeneratedIssueToken = createSelector(
  selectIssueTokenState,
  fromIssueToken.selectLastGeneratedToken
);
