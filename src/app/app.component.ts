import { Component, ChangeDetectionStrategy } from "@angular/core";
import { fadeAnimation } from "@animations/fade.animation";

import { Store } from "@ngrx/store";
import { State } from "./store/router-extends/state";
import { SelectIsRouteLoading } from "./store/router-extends/selector";
import { Observable } from "rxjs";

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

  constructor(private store: Store<State>) {
    this.isRouteLoader = this.store.select(SelectIsRouteLoading);
  }
}
