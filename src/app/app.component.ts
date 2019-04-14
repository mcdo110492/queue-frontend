import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Router, Event, NavigationStart } from "@angular/router";

import { Observable, of } from "rxjs";

import { fadeAnimation } from "@animations/fade.animation";

@Component({
  selector: "csab-root",
  template: `
    <mat-progress-bar
      mode="indeterminate"
      class="route-loader"
      color="primary"
      *ngIf="(isRouteLoader | async)"
    ></mat-progress-bar>
    <main [@fadeAnimation]="outlet.isActivated ? outlet.activatedRoute : ''">
      <router-outlet #outlet="outlet"></router-outlet>
    </main>
  `,
  styleUrls: ["./app.component.scss"],
  animations: [fadeAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  isRouteLoader: Observable<boolean>;

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.isRouteLoader = of(true);
      } else {
        this.isRouteLoader = of(false);
      }
    });
  }
}
