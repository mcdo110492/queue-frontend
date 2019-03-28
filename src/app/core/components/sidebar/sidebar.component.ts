import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { SideBarLinksModel } from "@core/models";
import { LayoutFacadesService } from "@core/facades/layout-facades.service";

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
    private facade: LayoutFacadesService
  ) {
    this.isHandset$ = this.breakPointObserver.observe(Breakpoints.Handset).pipe(
      map(res => {
        this.facade.toggleSidebar();
        return res.matches;
      })
    );
    this.isToggle$ = this.facade.isToggle$;
    this.sidebarLinks$ = this.facade.links$;
  }

  ngOnInit() {
    this.facade.generateUserLinks();
  }
}
