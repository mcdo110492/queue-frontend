import { Actions, ActionTypes } from "../actions/layout.action";
import { SideBarLinksModel } from "@core/models";

export interface State {
  isToggle: boolean;
  sidebarLinks: SideBarLinksModel[];
}

const initialState: State = {
  isToggle: true,
  sidebarLinks: []
};

export function layoutReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.TOGGLE_SIDENAV: {
      return { ...state, isToggle: !state.isToggle };
    }
    case ActionTypes.ADD_SIDEBAR_LINKS: {
      return { ...state, sidebarLinks: action.payload };
    }
    default: {
      return state;
    }
  }
}

export const getIsToggle = (state: State) => state.isToggle;
export const getSidebarLinks = (state: State) => state.sidebarLinks;
