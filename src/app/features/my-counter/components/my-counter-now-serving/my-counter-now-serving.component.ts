import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";

import { Observable } from "rxjs";

import { TokenModel } from "@features/my-counter/models/token.model";
import { TokenFacadeService } from "@features/my-counter/facades/token-facade.service";

@Component({
  selector: "csab-my-counter-now-serving",
  templateUrl: "./my-counter-now-serving.component.html",
  styleUrls: ["./my-counter-now-serving.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyCounterNowServingComponent implements OnInit {
  nowServing$: Observable<TokenModel>;
  isLoading$: Observable<boolean>;
  isServing$: Observable<boolean>;
  timer$: Observable<string>;

  btnDisabled(token: TokenModel) {
    if (token.id === 0) {
      return true;
    }

    return false;
  }

  callAgainToken(token: TokenModel) {
    this.facade.callAgainToken(token.id, token.ticket_number);
  }


  completeToken(token: TokenModel) {
    this.facade.completeToken(token.id, token.ticket_number);
  }

  stopToken(token: TokenModel) {
    this.facade.stopToken(token.id, token.ticket_number);
  }

  backToQueue(token: TokenModel) {
    this.facade.backToQueue(token.id, token.priority, token.ticket_number);
  }

  ngOnInit() {}

  constructor(private facade: TokenFacadeService) {
    this.nowServing$ = this.facade.nowServing$;
    this.isServing$ = this.facade.isServing$;
    this.timer$ = this.facade.timer$;

    this.facade.getUserLastTransaction();
  }
}
