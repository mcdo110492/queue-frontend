import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { UserService } from "@core/services/user/user.service";

import { RouteFacadesService } from "@core/facades/route-facades.service";
import { AuthFacadesService } from "@core/facades/auth-facades.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.service.backendRouteGuard().pipe(
      map(() => true),
      catchError(() => {
        console.log("Error Triggered");
        this.authFacade.revertToDefaultUser();
        this.routeFacade.navigate(["/login"]);
        return of(false);
      })
    );
  }

  constructor(
    private service: UserService,
    private routeFacade: RouteFacadesService,
    private authFacade: AuthFacadesService
  ) {}
}
