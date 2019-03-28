import { Injectable } from "@angular/core";

import { Select, Store } from "@ngxs/store";
import { Dispatch } from "@ngxs-labs/dispatch-decorator";

import { Authenticate, Logout } from "./../state/auth.actions";
import { AuthState } from "./../state/auth.state";

import { Observable } from "rxjs";
import { UserStateModel } from "@core/models";

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

  @Dispatch() authenticate = (credentials: {
    username: string;
    password: string;
  }) => new Authenticate(credentials);

  @Dispatch() logout = () => new Logout();

  constructor(private store: Store) {}
}
