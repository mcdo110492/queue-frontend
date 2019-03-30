import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

import { AuthFacadesService } from "@core/facades/auth-facades.service";
import { RoleRedirectService } from "@core/services/role-redirect/role-redirect.service";

@Injectable({
  providedIn: "root"
})
export class LoginGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = this.authFacade.tokenSnapshot();
    const role = this.authFacade.roleSnapShot();
    if (token) {
      this.roleRedirect.redirect(role);
      return false;
    }
    return true;
  }

  constructor(
    private roleRedirect: RoleRedirectService,
    private authFacade: AuthFacadesService
  ) {}
}
