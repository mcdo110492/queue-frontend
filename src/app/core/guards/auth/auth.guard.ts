import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";

import { UserService } from "@core/services/user/user.service";

import { RouteFacadesService } from "@core/facades/route-facades.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.service.backendRouteGuard().pipe(
      switchMap(isAuthenticated => {
        if (!isAuthenticated) {
          this.facade.navigate(["/login"]);
          return of(false);
        }
        return of(true);
      })
    );
  }

  constructor(
    private service: UserService,
    private facade: RouteFacadesService
  ) {}
}
