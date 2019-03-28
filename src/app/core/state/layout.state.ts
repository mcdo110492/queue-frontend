import { State, Action, StateContext, Store, Selector } from "@ngxs/store";
import { produce } from "@ngxs-labs/immer-adapter";

import { ToggleSidebar, GenerateUserLinks } from "./layout.actions";

import { SideBarLinksModel } from "@core/models";
import { SidebarlinkService } from "@core/services/layout/sidebarlink.service";
import { AuthState } from "./auth.state";

export class LayoutStateModel {
  isToggle: boolean;
  sidebarLinks: SideBarLinksModel[];
}

@State<LayoutStateModel>({
  name: "layout",
  defaults: {
    isToggle: true,
    sidebarLinks: []
  }
})
export class LayoutState {
  @Selector()
  static isToggle(state: LayoutStateModel) {
    return state.isToggle;
  }

  @Selector()
  static sidebarLinks(state: LayoutStateModel) {
    return state.sidebarLinks;
  }

  @Action(ToggleSidebar)
  toggleSidebar(ctx: StateContext<LayoutStateModel>) {
    produce(ctx, (draft: LayoutStateModel) => {
      draft.isToggle = !draft.isToggle;
    });
  }

  @Action(GenerateUserLinks)
  generateUserLinks(ctx: StateContext<LayoutStateModel>) {
    const { role } = this.store.selectSnapshot(AuthState.getUser);
    const links = this.service.createLinks(role);

    produce(ctx, (draft: LayoutStateModel) => {
      links.forEach(link => draft.sidebarLinks.push(link));
    });
  }

  constructor(private service: SidebarlinkService, private store: Store) {}
}
