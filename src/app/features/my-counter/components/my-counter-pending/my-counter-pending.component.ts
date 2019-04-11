import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";

import { Observable } from "rxjs";

import { TokenModel } from "@features/my-counter/models";
import { TokenFacadeService } from "@features/my-counter/facades/token-facade.service";
import { LaravelEchoService } from "@shared/services/laravel-echo/laravel-echo.service";

@Component({
  selector: "csab-my-counter-pending",
  templateUrl: "./my-counter-pending.component.html",
  styleUrls: ["./my-counter-pending.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyCounterPendingComponent implements OnInit {
  normalTokens$: Observable<TokenModel[]>;
  priorityTokens$: Observable<TokenModel[]>;
  isCalling$: Observable<boolean>;

  checkPriority(priority: number) {
    if (priority === 0) {
      return "primary";
    }

    return "accent";
  }

  callToken(token: TokenModel) {
    this.facade.callToken(token.id, token.priority, token.ticket_number);
  }

  ngOnInit() {
    window.LEcho.private("ticket-call").listen("ProcessTicketCall", e => {
      console.log(e);
    });
  }

  constructor(private facade: TokenFacadeService) {
    this.normalTokens$ = this.facade.normalTokens$;
    this.priorityTokens$ = this.facade.priorityTokens$;
    this.isCalling$ = this.facade.isCalling$;
    this.facade.loadTokens();
  }
}
