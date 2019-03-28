import { Injectable } from "@angular/core";
import { RouteFacadesService } from "@core/facades/route-facades.service";

@Injectable({
  providedIn: "root"
})
export class RoleRedirectService {
  redirect(role: number) {
    switch (role) {
      case 1:
        this.routeFacade.navigate(["/app/counter/list"]);
        break;

      case 2:
        this.routeFacade.navigate(["/queue/my/counter"]);
        break;
      default:
        this.routeFacade.navigate(["/app"]);
        break;
    }
  }

  constructor(private routeFacade: RouteFacadesService) {}
}
