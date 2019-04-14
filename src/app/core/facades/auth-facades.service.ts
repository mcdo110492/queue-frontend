import { Injectable } from "@angular/core";

import { Select, Store } from "@ngxs/store";
import { Dispatch } from "@ngxs-labs/dispatch-decorator";

import {
  Logout,
  RevertToDefaultUser,
  AddSocketId,
  IsAuthenticating,
  AuthenticateSuccess,
  AuthFailed
} from "./../state/auth.actions";
import { AuthState } from "./../state/auth.state";

import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { UserStateModel } from "@core/models";
import { UserService } from "@core/services/user/user.service";
import { RoleRedirectService } from "@core/services/role-redirect/role-redirect.service";
import { SnackBarService } from "@core/services/snack-bar/snack-bar.service";

@Injectable({
  providedIn: "root"
})
export class AuthFacadesService {
  @Select(AuthState.token) token$: Observable<string>;
  @Select(AuthState.getUser) user$: Observable<UserStateModel>;
  @Select(AuthState.isAuthenticating) isAuthenticating$: Observable<boolean>;

  tokenSnapshot() {
    return this.store.selectSnapshot(AuthState.token);
  }

  roleSnapShot() {
    return this.store.selectSnapshot(AuthState.role);
  }

  userIdSnapShot() {
    return this.store.selectSnapshot(AuthState.userId);
  }

  socketIdSnapShot() {
    return this.store.selectSnapshot(AuthState.socketId);
  }

  @Dispatch() isAuthenticating = (isYes: boolean) =>
    new IsAuthenticating(isYes);

  @Dispatch() authenticate = (credentials: {
    username: string;
    password: string;
  }) => {
    this.isAuthenticating(true);
    const { username, password } = credentials;
    const payload = { username, password };
    return this.service.authenticate(payload).pipe(
      map(user => {
        this.roleRedirect.redirect(user.role);
        return new AuthenticateSuccess({ user });
      }),
      catchError(err => {
        this.snackService.authSnackBarError(err.status);
        return of(new AuthFailed(err.status));
      })
    );
  };

  @Dispatch() logout = () => {
    return this.service.backEndLogout().pipe(
      map(() => {
        this.roleRedirect.redirectToLogin();
        return new Logout();
      }),
      catchError(err => {
        this.snackService.authSnackBarError(err.status);
        return of(new AuthFailed(err.status));
      })
    );
  };

  @Dispatch() revertToDefaultUser = () => {
    return new RevertToDefaultUser();
  };

  @Dispatch() addSocketId = (id: string | null) => {
    return new AddSocketId(id);
  };

  constructor(
    private store: Store,
    private service: UserService,
    private roleRedirect: RoleRedirectService,
    private snackService: SnackBarService
  ) {}
}
