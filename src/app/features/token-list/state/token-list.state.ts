import { State, Action, StateContext, Selector } from "@ngxs/store";
import { produce } from "@ngxs-labs/immer-adapter";

import { AddTokenLists, IsLoading } from "./token-list.actions";
import { TokenListModel } from "../models/token-list.model";

export class TokenListStateModel {
  entities: { [id: number]: TokenListModel };
  isLoading: boolean;
}

@State<TokenListStateModel>({
  name: "tokenList",
  defaults: {
    entities: {},
    isLoading: false
  }
})
export class TokenListState {
  @Selector()
  static isLoading(state: TokenListStateModel) {
    return state.isLoading;
  }

  @Selector()
  static entities(state: TokenListStateModel) {
    return state.entities;
  }

  @Action(IsLoading)
  isLoading(ctx: StateContext<TokenListStateModel>, { payload }: IsLoading) {
    produce(ctx, (draft: TokenListStateModel) => {
      draft.isLoading = payload;
    });
  }

  @Action(AddTokenLists)
  addTokenLists(
    ctx: StateContext<TokenListStateModel>,
    { payload: { tokens } }: AddTokenLists
  ) {
    produce(ctx, (draft: TokenListStateModel) => {
      draft.entities = tokens;
    });
  }
}
