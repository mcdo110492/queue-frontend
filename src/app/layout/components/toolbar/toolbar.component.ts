import { Component, ChangeDetectionStrategy } from "@angular/core";

import { Store } from "@ngrx/store";
import * as fromState from "./../../store/state";
import * as fromActions from "./../../store/action";

import * as fromUserState from "@user-store/store/state";
import * as fromUserActions from "@user-store/store/action";

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

  logout() {
    this.userStore.dispatch(new fromUserActions.Logout());
  }

  constructor(
    private store: Store<fromState.State>,
    private userStore: Store<fromUserState.State>
  ) {}
}
