import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

import { Observable, of } from "rxjs";
import { switchMap, map } from "rxjs/operators";

import { Store } from "@ngrx/store";

import * as fromUserActions from "@core/state/actions/user.action";
import * as fromUserState from "@core/state/reducers/user.reducer";

import { UserService } from "@core/services/user/user.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.service.backendRouteGuard().pipe(
      map(res => res),
      switchMap(isAuthenticated => {
        if (!isAuthenticated) {
          this.store.dispatch(new fromUserActions.RemoveUserCredentials());
          return of(false);
        }
        return of(true);
      })
    );
  }

  constructor(
    private service: UserService,
    private store: Store<fromUserState.State>
  ) {}
}
