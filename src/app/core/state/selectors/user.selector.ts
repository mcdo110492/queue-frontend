import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from "@ngrx/store";
import {
  State,
  getIsAuthenticating,
  getUsername,
  getName,
  getRole,
  getToken,
  getImagePath
} from "../reducers/user.reducer";

export const SelectUserState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>("user");

export const selectIsAuthenticating: MemoizedSelector<
  object,
  boolean
> = createSelector(
  SelectUserState,
  getIsAuthenticating
);

export const selectUsername: MemoizedSelector<object, string> = createSelector(
  SelectUserState,
  getUsername
);

export const selectName: MemoizedSelector<object, string> = createSelector(
  SelectUserState,
  getName
);

export const selectRole: MemoizedSelector<object, number> = createSelector(
  SelectUserState,
  getRole
);

export const selectToken: MemoizedSelector<object, string> = createSelector(
  SelectUserState,
  getToken
);

export const selectImagePath: MemoizedSelector<object, string> = createSelector(
  SelectUserState,
  getImagePath
);
