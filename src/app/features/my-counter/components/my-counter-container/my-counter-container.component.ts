import { Component, ChangeDetectionStrategy } from "@angular/core";

import { Observable } from "rxjs";

import { TokenFacadeService } from "@features/my-counter/facades/token-facade.service";
import { AuthFacadesService } from "@core/facades/auth-facades.service";

@Component({
  selector: "csab-my-counter-container",
  templateUrl: "./my-counter-container.component.html",
  styleUrls: ["./my-counter-container.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyCounterContainerComponent {
  pendingTokenCount$: Observable<number>;
  isCalling$: Observable<boolean>;

  callNext() {
    this.facade.callNext();
  }
  constructor(
    private facade: TokenFacadeService,
    private authFacade: AuthFacadesService
  ) {
    this.pendingTokenCount$ = this.facade.pendingTokenCount$;
    this.isCalling$ = this.facade.isCalling$;
    this.authFacade.addSocketId(window.LEcho.socketId());
  }
}
