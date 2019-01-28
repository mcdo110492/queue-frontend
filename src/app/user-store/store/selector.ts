import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from "@ngrx/store";
import { State } from "./state";

const getIsLoading = (state: State) => state.isLoading;
const getUsername = (state: State) => state.credentials.username;
const getName = (state: State) => state.credentials.name;
const getRole = (state: State) => state.credentials.role;
const getToken = (state: State) => state.credentials.token;
const getImagePath = (state: State) => state.credentials.image_path;

export const SelectUserState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>("user");

export const selectUserIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  SelectUserState,
  getIsLoading
);

export const selectUserUsername: MemoizedSelector<
  object,
  string
> = createSelector(
  SelectUserState,
  getUsername
);

export const selectUserName: MemoizedSelector<object, string> = createSelector(
  SelectUserState,
  getName
);

export const selectUserRole: MemoizedSelector<object, number> = createSelector(
  SelectUserState,
  getRole
);

export const selectUserToken: MemoizedSelector<object, string> = createSelector(
  SelectUserState,
  getToken
);

export const selectImagePath: MemoizedSelector<object, string> = createSelector(
  SelectUserState,
  getImagePath
);
