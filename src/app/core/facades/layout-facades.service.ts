import { Injectable } from "@angular/core";

import { Select } from "@ngxs/store";
import { Dispatch } from "@ngxs-labs/dispatch-decorator";

import { ToggleSidebar, GenerateUserLinks } from "../state/layout.actions";
import { LayoutState } from "../state/layout.state";

import { Observable } from "rxjs";

import { SideBarLinksModel } from "@core/models";

@Injectable({
  providedIn: "root"
})
export class LayoutFacadesService {
  @Select(LayoutState.sidebarLinks) links$: Observable<SideBarLinksModel[]>;
  @Select(LayoutState.isToggle) isToggle$: Observable<boolean>;

  @Dispatch() toggleSidebar = () => new ToggleSidebar();

  @Dispatch() generateUserLinks = () => new GenerateUserLinks();
}
