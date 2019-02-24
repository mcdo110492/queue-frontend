import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromCounterUser from "../reducers/counter-user.reducer";

export const selectCounterUserState = createFeatureSelector<
  fromCounterUser.State
>("counter-user");

export const selectCounterUserIds = createSelector(
  selectCounterUserState,
  fromCounterUser.selectCounterUserIds
);

export const selectCounterUserEntities = createSelector(
  selectCounterUserState,
  fromCounterUser.selectCounterUserEntities
);

export const selectAllCounterUser = createSelector(
  selectCounterUserState,
  fromCounterUser.selectAllCounterUsers
);

export const selectCounterUserTotal = createSelector(
  selectCounterUserState,
  fromCounterUser.selectCounterUsersTotal
);

export const selectCurrentCounterUserId = createSelector(
  selectCounterUserState,
  fromCounterUser.getSelectedCounterUserId
);

export const selectCurrentCounterUser = createSelector(
  selectCounterUserEntities,
  selectCurrentCounterUserId,
  (counterUserEntities, counterUserId) => counterUserEntities[counterUserId]
);

export const selectCounterUserIsLoading = createSelector(
  selectCounterUserState,
  fromCounterUser.selectIsLoading
);

export const selectCounterUserIsSaving = createSelector(
  selectCounterUserState,
  fromCounterUser.selectIsSaving
);

export const selectCounterOptions = createSelector(
  selectCounterUserState,
  fromCounterUser.selectCounterOptions
);

export const selectUserOptions = createSelector(
  selectCounterUserState,
  fromCounterUser.selectUserOptions
);
