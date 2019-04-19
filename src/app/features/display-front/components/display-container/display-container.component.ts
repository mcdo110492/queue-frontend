import { Component, ChangeDetectionStrategy, OnDestroy } from "@angular/core";
import { LaravelEchoService } from "@shared/services/laravel-echo/laravel-echo.service";
import { AuthFacadesService } from "@core/facades/auth-facades.service";

@Component({
  selector: "csab-display-container",
  templateUrl: "./display-container.component.html",
  styleUrls: ["./display-container.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayContainerComponent implements OnDestroy {
  ngOnDestroy() {
    this.echo.disconnect();
  }

  constructor(
    private echo: LaravelEchoService,
    private authFacade: AuthFacadesService
  ) {
    this.echo.authLaravelEcho(this.authFacade.tokenSnapshot());
  }
}
