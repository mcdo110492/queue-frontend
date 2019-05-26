import { State, Action, StateContext, Selector } from "@ngxs/store";

import {
  Logout,
  RevertToDefaultUser,
  AddSocketId,
  AuthenticateSuccess
} from "./auth.actions";
import { UserStateModel } from "@core/models";

import { produce } from "@ngxs-labs/immer-adapter";

export class AuthStateModel {
  isAuthenticating: boolean;
  user: UserStateModel;
  socket_id: string | null;
}

const defaultUserState: UserStateModel = {
  id: 0,
  username: null,
  role: 0,
  token: null,
  image_path: "default.jpg",
  name: null,
  department_id: null
};

@State<AuthStateModel>({
  name: "auth",
  defaults: {
    isAuthenticating: false,
    user: defaultUserState,
    socket_id: "1"
  }
})
export class AuthState {
  @Selector()
  static token(state: AuthStateModel) {
    return state.user.token;
  }

  @Selector()
  static socketId(state: AuthStateModel) {
    return state.socket_id;
  }

  @Selector()
  static role(state: AuthStateModel) {
    return state.user.role;
  }

  @Selector()
  static department_id(state: AuthStateModel) {
    return state.user.department_id;
  }

  @Selector()
  static userId(state: AuthStateModel) {
    return state.user.id;
  }

  @Selector()
  static getUser(state: AuthStateModel) {
    const { id, name, username, role, image_path, department_id } = state.user;
    return { id, name, username, role, image_path, department_id };
  }

  @Selector()
  static isAuthenticating(state: AuthStateModel): boolean {
    return state.isAuthenticating;
  }

  @Action(RevertToDefaultUser)
  revertToDefaultUser(ctx: StateContext<AuthStateModel>) {
    produce(ctx, (draft: AuthStateModel) => {
      draft.user = defaultUserState;
    });
  }

  @Action(AddSocketId)
  addSocketId(ctx: StateContext<AuthStateModel>, { id }: AddSocketId) {
    produce(ctx, (draft: AuthStateModel) => {
      draft.socket_id = id;
    });
  }

  @Action(AuthenticateSuccess)
  authenticateSuccess(
    ctx: StateContext<AuthStateModel>,
    { payload: { user } }: AuthenticateSuccess
  ) {
    produce(ctx, (draft: AuthStateModel) => {
      draft.user = user;
    });
  }

  @Action(Logout)
  Logout(ctx: StateContext<AuthStateModel>) {
    produce(ctx, (draft: AuthStateModel) => {
      draft.user = defaultUserState;
    });
  }
}
