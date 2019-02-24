import { Component, ChangeDetectionStrategy } from "@angular/core";

import { Store } from "@ngrx/store";

import * as fromLayoutActions from "@core/state/actions/layout.action";
import * as fromLayoutState from "@core/state/reducers/layout.reducer";

import * as fromUserActions from "@core/state/actions/user.action";
import * as fromUserState from "@core/state/reducers/user.reducer";

@Component({
  selector: "csab-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
  toggleSidebar() {
    this.layoutStore.dispatch(new fromLayoutActions.ToggleSidenav());
  }

  logout() {
    this.userStore.dispatch(new fromUserActions.Logout());
  }

  constructor(
    private layoutStore: Store<fromLayoutState.State>,
    private userStore: Store<fromUserState.State>
  ) {}
}
