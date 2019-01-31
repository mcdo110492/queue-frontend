import { Component, ChangeDetectionStrategy } from "@angular/core";
import { fadeAnimation } from "@animations/fade.animation";

@Component({
  selector: "csab-root",
  template: `
    <main [@fadeAnimation]="outlet.isActivated ? outlet.activatedRoute : ''">
      <router-outlet #outlet="outlet"></router-outlet>
    </main>
  `,
  styleUrls: ["./app.component.scss"],
  animations: [fadeAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
