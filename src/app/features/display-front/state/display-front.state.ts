import { State, Action, StateContext, Selector } from "@ngxs/store";
import {
  AddAnnouncements,
  AddMedias,
  AddToken,
  AddTokens
} from "./display-front.actions";
import { AnnouncementModel, MediaModel, TokenModel } from "../models";
import { produce } from "@ngxs-labs/immer-adapter";

export class DisplayFrontStateModel {
  announcements: AnnouncementModel[];
  isAnnouncementLoading: boolean;
  medias: MediaModel[];
  isMediaLoading: boolean;
  tokens: { [id: number]: TokenModel };
  tokenIds: number[];
  isTokenLoading: boolean;
}

@State<DisplayFrontStateModel>({
  name: "displayFront",
  defaults: {
    announcements: [],
    isAnnouncementLoading: false,
    medias: [],
    isMediaLoading: false,
    tokens: {},
    tokenIds: [],
    isTokenLoading: false
  }
})
export class DisplayFrontState {
  @Selector()
  static announcements(state: DisplayFrontStateModel) {
    return state.announcements;
  }

  @Selector()
  static medias(state: DisplayFrontStateModel) {
    return state.medias;
  }

  @Selector()
  static tokenIds(state: DisplayFrontStateModel) {
    return state.tokenIds;
  }

  @Selector()
  static isAnnouncementLoading(state: DisplayFrontStateModel) {
    return state.isAnnouncementLoading;
  }

  @Selector()
  static isMediaLoading(state: DisplayFrontStateModel) {
    return state.isMediaLoading;
  }

  @Selector()
  static isTokenLoading(state: DisplayFrontStateModel) {
    return state.isTokenLoading;
  }

  @Selector()
  static getLatestToken(state: DisplayFrontStateModel) {
    const firstIndex = state.tokenIds[0];
    return state.tokens[firstIndex]
      ? state.tokens[firstIndex]
      : { id: 0, ticket_number: 0, status: 0, priority: 0 };
  }

  @Selector()
  static getPastToken(state: DisplayFrontStateModel) {
    const firstThree = state.tokenIds.slice(1, 4);
    return firstThree.map(id => state.tokens[id]);
  }

  @Action(AddAnnouncements)
  addAnnouncements(
    ctx: StateContext<DisplayFrontStateModel>,
    { payload: { announcements } }: AddAnnouncements
  ) {
    produce(ctx, (draft: DisplayFrontStateModel) => {
      draft.announcements = announcements;
    });
  }

  @Action(AddMedias)
  addMedias(
    ctx: StateContext<DisplayFrontStateModel>,
    { payload: { medias } }: AddMedias
  ) {
    produce(ctx, (draft: DisplayFrontStateModel) => {
      draft.medias = medias;
    });
  }

  @Action(AddTokens)
  addTokens(
    ctx: StateContext<DisplayFrontStateModel>,
    { payload: { tokens } }: AddTokens
  ) {
    let ids = [];
    tokens.forEach(token => ids.push(token.id));
    produce(ctx, (draft: DisplayFrontStateModel) => {
      draft.tokens = Object.assign(
        draft.tokens,
        ...tokens.map(entity => ({ [entity.id]: entity }))
      );
      draft.tokenIds = ids;
    });
  }

  @Action(AddToken)
  addToken(
    ctx: StateContext<DisplayFrontStateModel>,
    { payload: { token } }: AddToken
  ) {
    produce(ctx, (draft: DisplayFrontStateModel) => {
      const isIdExist = draft.tokenIds.includes(token.id);

      if (!isIdExist) {
        const entity = { [token.id]: token };
        draft.tokens = Object.assign(draft.tokens, entity);
      } else {
        const index = draft.tokenIds.indexOf(token.id);
        draft.tokenIds.splice(index, 1);
      }
      draft.tokenIds.unshift(token.id);
    });
  }
}
