import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy
} from "@angular/core";

import { Observable } from "rxjs";

import { TokenModel } from "@features/my-counter/models";
import { TokenFacadeService } from "@features/my-counter/facades/token-facade.service";
import { NotificationSoundService } from "@shared/services/notification-sound/notification-sound.service";
import { AuthFacadesService } from "@core/facades/auth-facades.service";

@Component({
  selector: "csab-my-counter-pending",
  templateUrl: "./my-counter-pending.component.html",
  styleUrls: ["./my-counter-pending.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyCounterPendingComponent implements OnInit, OnDestroy {
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
    const department_id = this.authFacade.departmentIdSnapShot();
    window.Laravel.private(`ticket-call.${department_id}`).listen(
      "ProcessTicketCall",
      (e: { id: number; priority: number }) => {
        const { id, priority } = e;
        this.facade.removeTokenWS(id, priority);
      }
    );

    window.Laravel.private(`ticket-back-to-queue.${department_id}`).listen(
      "ProcessTicketBackToQueue",
      (e: { id: number; priority: number }) => {
        const { id, priority } = e;
        this.facade.addTokenWS(id, priority);
        this.notif.playBell();
      }
    );

    window.Laravel.private(`issue-ticket.${department_id}`).listen(
      "ProcessIssueToken",
      (e: { token: TokenModel }) => {
        this.facade.addIssueTokenWS(e.token);
        this.notif.playBell();
      }
    );
  }

  ngOnDestroy() {
    window.Laravel.leave("ticket-call");
    window.Laravel.leave("ticket-back-to-queue");
    window.Laravel.leave("issue-ticket");
  }

  constructor(
    private facade: TokenFacadeService,
    private notif: NotificationSoundService,
    private authFacade: AuthFacadesService
  ) {
    this.normalTokens$ = this.facade.normalTokens$;
    this.priorityTokens$ = this.facade.priorityTokens$;
    this.isCalling$ = this.facade.isCalling$;
    this.facade.loadTokens();
  }
}
