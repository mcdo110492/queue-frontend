import { State, Action, StateContext, Selector } from "@ngxs/store";
import { produce } from "@ngxs-labs/immer-adapter";

import {
  AddToken,
  AddTokens,
  IsTokenLoading,
  CallNextToken,
  BackToQueueToken,
  CallToken,
  ServeToken,
  FinishToken,
  StopToken
} from "./token.actions";

import { TokenModel } from "../models";

export class TokenStateModel {
  tokens: { [id: number]: TokenModel };
  priorityIds: number[];
  normalIds: number[];
  nowServing: number;
  isTokenLoading: boolean;
  isServing: boolean;
  isCalling: boolean;
}
// @dynamic
@State<TokenStateModel>({
  name: "token",
  defaults: {
    tokens: {},
    priorityIds: [],
    normalIds: [],
    nowServing: 0,
    isTokenLoading: false,
    isServing: false,
    isCalling: false
  }
})
export class TokenState {
  @Selector()
  static isTokenLoading(state: TokenStateModel) {
    return state.isTokenLoading;
  }

  @Selector()
  static isServing(state: TokenStateModel) {
    return state.isServing;
  }

  @Selector()
  static isCalling(state: TokenStateModel) {
    return state.isCalling;
  }

  @Selector()
  static priorityToken(state: TokenStateModel) {
    const priority = state.priorityIds.map(id => state.tokens[id]);
    return priority;
  }

  @Selector()
  static pendingTokenCount(state: TokenStateModel) {
    return state.priorityIds.length + state.normalIds.length;
  }

  @Selector()
  static normalToken(state: TokenStateModel) {
    const normal = state.normalIds.map(id => state.tokens[id]);
    return normal;
  }

  @Selector()
  static nowServingToken(state: TokenStateModel) {
    const { nowServing, tokens } = state;
    const token =
      nowServing === 0
        ? { id: 0, ticket_number: 0, priority: 0, status: 0 }
        : tokens[nowServing];
    return token;
  }

  @Action(IsTokenLoading)
  isTokenLoading(
    ctx: StateContext<TokenStateModel>,
    { payload }: IsTokenLoading
  ) {
    produce(ctx, (draft: TokenStateModel) => {
      draft.isTokenLoading = payload;
    });
  }

  @Action(AddTokens)
  addTokens(
    ctx: StateContext<TokenStateModel>,
    { payload: { tokens } }: AddTokens
  ) {
    let priorityIds = [];
    let normalIds = [];
    tokens.forEach(token => {
      token.priority === 1
        ? priorityIds.push(token.id)
        : normalIds.push(token.id);
    });
    produce(ctx, (draft: TokenStateModel) => {
      draft.tokens = Object.assign(
        {},
        ...tokens.map(entity => ({ [entity.id]: entity }))
      );
      draft.priorityIds = priorityIds;
      draft.normalIds = normalIds;
    });
  }

  @Action(AddToken)
  addToken(
    ctx: StateContext<TokenStateModel>,
    { payload: { token } }: AddToken
  ) {
    produce(ctx, (draft: TokenStateModel) => {
      const entity = { [token.id]: token };
      draft.tokens = Object.assign(draft.tokens, entity);

      if (token.priority === 0) {
        draft.priorityIds.push(token.id);
      } else {
        draft.normalIds.push(token.id);
      }
    });
  }

  @Action(CallToken)
  callToken(
    ctx: StateContext<TokenStateModel>,
    { payload: { id, priority } }: CallToken
  ) {
    produce(ctx, (draft: TokenStateModel) => {
      if (priority === 1) {
        const index = draft.priorityIds.indexOf(id);
        draft.priorityIds.splice(index, 1);
      } else {
        const index = draft.normalIds.indexOf(id);
        draft.normalIds.splice(index, 1);
      }
      draft.nowServing = id;
      draft.isCalling = true;
    });
  }

  @Action(CallNextToken)
  callNextToken(ctx: StateContext<TokenStateModel>) {
    produce(ctx, (draft: TokenStateModel) => {
      if (draft.priorityIds.length > 0) {
        const firstId = draft.priorityIds[0];
        const index = draft.priorityIds.indexOf(firstId);
        draft.priorityIds.splice(index, 1);
        draft.nowServing = firstId;
      } else {
        const firstId = draft.normalIds[0];
        const index = draft.normalIds.indexOf(firstId);
        draft.normalIds.splice(index, 1);
        draft.nowServing = firstId;
      }
      draft.isCalling = true;
    });
  }

  @Action(BackToQueueToken)
  backToQueueToken(
    ctx: StateContext<TokenStateModel>,
    { payload: { id, priority } }: BackToQueueToken
  ) {
    produce(ctx, (draft: TokenStateModel) => {
      if (priority === 1) {
        draft.priorityIds.push(id);
      } else {
        draft.normalIds.push(id);
      }
      draft.nowServing = 0;
      draft.isCalling = false;
    });
  }

  @Action(ServeToken)
  serveToken(ctx: StateContext<TokenStateModel>) {
    produce(ctx, (draft: TokenStateModel) => {
      draft.isServing = true;
    });
  }

  @Action(FinishToken)
  finishToken(ctx: StateContext<TokenStateModel>) {
    produce(ctx, (draft: TokenStateModel) => {
      draft.isServing = false;
      draft.isCalling = false;
      draft.nowServing = 0;
    });
  }

  @Action(StopToken)
  stopToken(ctx: StateContext<TokenStateModel>) {
    produce(ctx, (draft: TokenStateModel) => {
      draft.isServing = false;
      draft.isCalling = false;
      draft.nowServing = 0;
    });
  }
}
