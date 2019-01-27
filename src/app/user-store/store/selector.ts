import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from "@ngrx/store";
import { State } from "./state";

const getUsername = (state: State) => state.credentials.username;
const getName = (state: State) => state.credentials.name;
const getRole = (state: State) => state.credentials.role;
const getToken = (state: State) => state.credentials.token;
const getProfileImage = (state: State) => state.credentials.profileImage;

export const SelectUserState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>("user");

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

export const selectProfileImage: MemoizedSelector<
  object,
  string
> = createSelector(
  SelectUserState,
  getProfileImage
);
