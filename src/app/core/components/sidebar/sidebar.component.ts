import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Store } from "@ngrx/store";

import * as fromLayoutActions from "@core/state/actions/layout.action";
import * as fromLayoutState from "@core/state/reducers/layout.reducer";
import * as fromLayouSelectors from "@core/state/selectors/layout.selector";

import { SideBarLinksModel } from "@core/models";

@Component({
  selector: "csab-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {
  isToggle$: Observable<boolean>;
  sidebarLinks$: Observable<SideBarLinksModel[]>;
  isHandset$: Observable<boolean>;

  constructor(
    private breakPointObserver: BreakpointObserver,
    private store: Store<fromLayoutState.State>
  ) {
    this.isHandset$ = this.breakPointObserver
      .observe(Breakpoints.Handset)
      .pipe(map(res => res.matches));
    this.isToggle$ = this.store.select(fromLayouSelectors.SelectIsToggle);
    this.sidebarLinks$ = this.store.select(
      fromLayouSelectors.SelectSidebarLinks
    );
  }

  ngOnInit() {
    this.store.dispatch(new fromLayoutActions.CreateLinks());
  }
}
