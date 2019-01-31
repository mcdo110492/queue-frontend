import { Component, ChangeDetectionStrategy } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Store } from "@ngrx/store";
import * as fromState from "./../../store/state";
import * as fromSelectors from "./../../store/selectors";

import { SidenavMetadataModel } from "./../../models";

@Component({
  selector: "csab-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  isSideNavToggle$: Observable<boolean>;
  sidebarLinks$: Observable<SidenavMetadataModel[]>;
  isHandset$: Observable<boolean> = this.breakpointObservers
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(
    private breakpointObservers: BreakpointObserver,
    private store: Store<fromState.State>
  ) {
    this.isSideNavToggle$ = this.store.select(
      fromSelectors.selectLayoutSidenavIsToggle
    );
    this.sidebarLinks$ = this.store.select(
      fromSelectors.selectSidebarLinksByRole
    );
  }
}
