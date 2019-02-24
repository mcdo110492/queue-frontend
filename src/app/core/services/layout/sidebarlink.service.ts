import { Injectable } from "@angular/core";

import { SideBarLinksModel } from "@core/models";
import * as fromSidebarLinks from "@core/metadata";

@Injectable({
  providedIn: "root"
})
export class SidebarlinkService {
  createLinks(role: number): SideBarLinksModel[] {
    if (role === 1) {
      return fromSidebarLinks.ADMINISTRATOR_LINKS;
    }
  }
}
