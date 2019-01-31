import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable, of } from "rxjs";
import { UserService } from "@user-store/services/user.service";
import { map, switchMap } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { RemoveUserCredentials } from "@user-store/store/action";
import { State } from "@user-store/store/state";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.service.clientRouteGuard().pipe(
      map(res => res),
      switchMap(isAuthenticated => {
        if (!isAuthenticated) {
          this.store.dispatch(new RemoveUserCredentials());
          return of(false);
        }
        return of(true);
      })
    );
  }

  constructor(private service: UserService, private store: Store<State>) {}
}
