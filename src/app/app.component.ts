import { Component, ChangeDetectionStrategy } from "@angular/core";

import { Observable } from "rxjs";

import { Store } from "@ngrx/store";

import * as fromRouterState from "@core/state/reducers/router-extends.reducer";
import * as fromRouterSelectors from "@core/state/selectors/router-extends.selector";

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

  constructor(private store: Store<fromRouterState.State>) {
    this.isRouteLoader = this.store.select(
      fromRouterSelectors.SelectIsRouteLoading
    );
  }
}
