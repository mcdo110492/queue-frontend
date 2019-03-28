import { Component, ChangeDetectionStrategy } from "@angular/core";

import { Observable } from "rxjs";

import { TokenFacadeService } from "@features/my-counter/facades/token-facade.service";

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
  constructor(private facade: TokenFacadeService) {
    this.pendingTokenCount$ = this.facade.pendingTokenCount$;
    this.isCalling$ = this.facade.isCalling$;
  }
}
