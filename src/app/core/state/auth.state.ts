import { State, Action, StateContext, Selector } from "@ngxs/store";

import {
  Authenticate,
  Logout,
  AuthFailed,
  RevertToDefaultUser
} from "./auth.actions";
import { UserStateModel } from "@core/models";

import { UserService } from "@core/services/user/user.service";
import { SnackBarService } from "@core/services/snack-bar/snack-bar.service";

import { tap, catchError } from "rxjs/operators";
import { produce } from "@ngxs-labs/immer-adapter";
import { of } from "rxjs";
import { RoleRedirectService } from "@core/services/role-redirect/role-redirect.service";

export class AuthStateModel {
  isAuthenticating: boolean;
  user: UserStateModel;
}

const defaultUserState: UserStateModel = {
  id: 0,
  username: null,
  role: 0,
  token: null,
  image_path: "default.jpg",
  name: null
};

@State<AuthStateModel>({
  name: "auth",
  defaults: {
    isAuthenticating: false,
    user: defaultUserState
  }
})
export class AuthState {
  @Selector()
  static token(state: AuthStateModel) {
    return state.user.token;
  }

  @Selector()
  static role(state: AuthStateModel) {
    return state.user.role;
  }

  @Selector()
  static getUser(state: AuthStateModel): UserStateModel {
    const { id, name, username, role, image_path } = state.user;
    return { id, name, username, role, image_path };
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

  @Action(Authenticate)
  authenticate(ctx: StateContext<AuthStateModel>, { payload }: Authenticate) {
    produce(ctx, (draft: AuthStateModel) => {
      draft.isAuthenticating = true;
    });

    return this.service.authenticate(payload).pipe(
      tap(result => {
        produce(ctx, (draft: AuthStateModel) => {
          draft.user = result;
          draft.isAuthenticating = false;
        });
        this.roleRedirect.redirect(result.role);
      }),
      catchError(err => of(ctx.dispatch(new AuthFailed(err.status))))
    );
  }

  @Action(AuthFailed)
  authFailed(ctx: StateContext<AuthStateModel>, { errStatus }: AuthFailed) {
    this.snackService.authSnackBarError(errStatus);

    produce(ctx, (draft: AuthStateModel) => {
      draft.isAuthenticating = false;
    });
  }

  @Action(Logout)
  Logout(ctx: StateContext<AuthStateModel>) {
    return this.service.backEndLogout().pipe(
      tap(() => {
        produce(ctx, (draft: AuthStateModel) => {
          draft.user = defaultUserState;
        });
      })
    );
  }

  constructor(
    private service: UserService,
    private snackService: SnackBarService,
    private roleRedirect: RoleRedirectService
  ) {}
}
