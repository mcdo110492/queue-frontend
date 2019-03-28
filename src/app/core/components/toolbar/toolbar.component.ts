import { Component, ChangeDetectionStrategy } from "@angular/core";

import { AuthFacadesService } from "@core/facades/auth-facades.service";
import { LayoutFacadesService } from "@core/facades/layout-facades.service";

@Component({
  selector: "csab-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
  toggleSidebar() {
    this.layoutFacade.toggleSidebar();
  }

  logout() {
    this.authFacade.logout();
  }

  constructor(
    private authFacade: AuthFacadesService,
    private layoutFacade: LayoutFacadesService
  ) {}
}
