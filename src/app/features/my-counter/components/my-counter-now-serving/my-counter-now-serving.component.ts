import { Component, ChangeDetectionStrategy } from "@angular/core";

import { Observable } from "rxjs";

import { TokenModel } from "@features/my-counter/models/token.model";
import { TokenFacadeService } from "@features/my-counter/facades/token-facade.service";

@Component({
  selector: "csab-my-counter-now-serving",
  templateUrl: "./my-counter-now-serving.component.html",
  styleUrls: ["./my-counter-now-serving.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyCounterNowServingComponent {
  nowServing$: Observable<TokenModel>;
  isLoading$: Observable<boolean>;
  isServing$: Observable<boolean>;

  btnDisabled(token: TokenModel) {
    if (token.id === 0) {
      return true;
    }

    return false;
  }

  callAgainToken(token: TokenModel) {
    this.facade.callAgainToken(token.id);
  }

  serveToken(token: TokenModel) {
    this.facade.serveToken(token.id, token.ticket_number);
  }

  completeToken(token: TokenModel) {
    this.facade.completeToken(token.id, token.ticket_number);
  }

  stopToken(token: TokenModel) {
    this.facade.stopToken(token.id, token.ticket_number);
  }

  backToQueue(token: TokenModel) {
    this.facade.backToQueue(token.id, token.priority);
  }

  constructor(private facade: TokenFacadeService) {
    this.nowServing$ = this.facade.nowServing$;
    this.isServing$ = this.facade.isServing$;
  }
}
