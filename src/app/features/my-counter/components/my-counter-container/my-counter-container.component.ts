import { Component, ChangeDetectionStrategy, OnDestroy } from "@angular/core";

import { Observable } from "rxjs";

import { TokenFacadeService } from "@features/my-counter/facades/token-facade.service";
import { AuthFacadesService } from "@core/facades/auth-facades.service";
import { LaravelEchoService } from "@shared/services/laravel-echo/laravel-echo.service";

@Component({
  selector: "csab-my-counter-container",
  templateUrl: "./my-counter-container.component.html",
  styleUrls: ["./my-counter-container.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyCounterContainerComponent implements OnDestroy {
  pendingTokenCount$: Observable<number>;
  isCalling$: Observable<boolean>;

  callNext() {
    this.facade.callNext();
  }

  ngOnDestroy() {
    this.echo.disconnect();
  }

  constructor(
    private facade: TokenFacadeService,
    private authFacade: AuthFacadesService,
    private echo: LaravelEchoService
  ) {
    this.pendingTokenCount$ = this.facade.pendingTokenCount$;
    this.isCalling$ = this.facade.isCalling$;
    this.echo.authLaravelEcho(this.authFacade.tokenSnapshot());
  }
}
