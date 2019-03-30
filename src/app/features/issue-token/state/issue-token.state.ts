import { State, Action, StateContext, Selector } from "@ngxs/store";
import { produce } from "@ngxs-labs/immer-adapter";

import { IssueTokenSuccess, IsSaving } from "./issue-token.actions";
import { IssueTokenModel } from "../models";

export class IssueTokenStateModel {
  isSaving: boolean;
  generatedToken: IssueTokenModel;
}

@State<IssueTokenStateModel>({
  name: "issueToken",
  defaults: {
    isSaving: false,
    generatedToken: null
  }
})
export class IssueTokenState {
  @Selector() static isSaving(state: IssueTokenStateModel) {
    return state.isSaving;
  }

  @Selector() static generatedToken(state: IssueTokenStateModel) {
    return state.generatedToken;
  }

  @Action(IsSaving)
  isSaving(ctx: StateContext<IssueTokenStateModel>, { payload }: IsSaving) {
    produce(ctx, (draft: IssueTokenStateModel) => {
      draft.isSaving = payload;
    });
  }

  @Action(IssueTokenSuccess)
  issueTokenSuccess(
    ctx: StateContext<IssueTokenStateModel>,
    { payload }: IssueTokenSuccess
  ) {
    produce(ctx, (draft: IssueTokenStateModel) => {
      draft.generatedToken = payload;
    });
  }
}
