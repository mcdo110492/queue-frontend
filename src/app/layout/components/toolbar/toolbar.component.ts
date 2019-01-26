import { Component, ChangeDetectionStrategy } from "@angular/core";

import { Store } from "@ngrx/store";
import * as fromState from "./../../store/state";
import * as fromActions from "./../../store/action";

@Component({
  selector: "csab-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
  toggleSideNav() {
    this.store.dispatch(new fromActions.ToggleSidenav());
  }

  constructor(private store: Store<fromState.State>) {}
}
