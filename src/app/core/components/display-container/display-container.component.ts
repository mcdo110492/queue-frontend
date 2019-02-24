import { Component, ChangeDetectionStrategy } from "@angular/core";
import { fadeAnimation } from "@animations/fade.animation";

@Component({
  selector: "csab-display-container",
  template: `
    <div [@fadeAnimation]="o.isActivated ? o.activatedRoute : ''">
      <router-outlet #o="outlet"></router-outlet>
    </div>
  `,
  animations: [fadeAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayContainerComponent {}
