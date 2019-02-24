import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Store } from "@ngrx/store";

import * as fromUserState from "@core/state/reducers/user.reducer";
import * as fromUserSelectors from "@core/state/selectors/user.selector";

@Injectable({
  providedIn: "root"
})
export class LoginGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.select(fromUserSelectors.selectToken).pipe(
      map(token => {
        if (token) {
          this.router.navigate(["/app"]);
          return false;
        }

        return true;
      })
    );
  }

  constructor(
    private router: Router,
    private store: Store<fromUserState.State>
  ) {}
}
