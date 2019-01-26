import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "csab-root",
  template: `
    <router-outlet></router-outlet>
  `,
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
