import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from "@angular/core";

import { Observable } from "rxjs";

import { TokenModel } from "@features/display-front/models";

import { DisplayFrontFacadeService } from "@features/display-front/facades";
import { NotificationSoundService } from "@shared/services/notification-sound/notification-sound.service";

@Component({
  selector: "csab-display-now-serving",
  templateUrl: "./display-now-serving.component.html",
  styleUrls: ["./display-now-serving.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayNowServingComponent implements OnInit, OnDestroy {
  latestToken$: Observable<TokenModel>;
  ngOnInit() {
    window.Laravel.channel("display-now-serving").listen(
      "DisplayNowServing",
      (e: { token: TokenModel }) => {
        this.facade.addNewToken(e.token);
        this.notif.playChimes();
      }
    );
  }

  ngOnDestroy() {
    window.Laravel.leave("display-now-serving");
  }
  constructor(
    private facade: DisplayFrontFacadeService,
    private notif: NotificationSoundService
  ) {
    this.latestToken$ = this.facade.latestToken$;
  }
}
