import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Observable } from "rxjs";
import { TokenModel } from "@features/display-front/models";
import { DisplayFrontFacadeService } from "@features/display-front/facades";

@Component({
  selector: "csab-display-counter-card",
  templateUrl: "./display-counter-card.component.html",
  styleUrls: ["./display-counter-card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayCounterCardComponent {
  pastTokens$: Observable<TokenModel[]>;
  cardBg: any[] = ["primary-card", "accent-card", "warn-card"];

  generateCardBg() {
    return this.cardBg[(Math.random() * this.cardBg.length) | 0];
  }

  getCounterNumber(counter: string) {
    return counter.replace(/\D/g, "");
  }

  trackById(index: any, token: TokenModel) {
    return token ? token.id : undefined;
  }

  constructor(private facade: DisplayFrontFacadeService) {
    this.pastTokens$ = this.facade.pastTokens$;
  }
}
