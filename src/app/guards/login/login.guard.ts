import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";

import { Store } from "@ngrx/store";
import { State } from "@user-store/store/state";
import { selectUserToken } from "@user-store/store/selector";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class LoginGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.select(selectUserToken).pipe(
      map(token => {
        if (token) {
          this.router.navigate(["/app"]);
          return false;
        }

        return true;
      })
    );
  }

  constructor(private router: Router, private store: Store<State>) {}
}
