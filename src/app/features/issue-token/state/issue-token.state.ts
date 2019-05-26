import { State, Action, StateContext, Selector } from "@ngxs/store";
import { produce } from "@ngxs-labs/immer-adapter";

import {
  IssueTokenSuccess,
  IsSaving,
  AddDepartmentOptions
} from "./issue-token.actions";
import { IssueTokenModel, DepartmentModel } from "../models";

export class IssueTokenStateModel {
  isSaving: boolean;
  generatedToken: IssueTokenModel;
  departments: DepartmentModel[];
}

@State<IssueTokenStateModel>({
  name: "issueToken",
  defaults: {
    isSaving: false,
    generatedToken: null,
    departments: []
  }
})
export class IssueTokenState {
  @Selector() static isSaving(state: IssueTokenStateModel) {
    return state.isSaving;
  }

  @Selector() static generatedToken(state: IssueTokenStateModel) {
    return state.generatedToken;
  }

  @Selector() static departments(state: IssueTokenStateModel) {
    return state.departments;
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

  @Action(AddDepartmentOptions)
  addDepartmentOptions(
    ctx: StateContext<IssueTokenStateModel>,
    { payload: { departments } }: AddDepartmentOptions
  ) {
    produce(ctx, (draft: IssueTokenStateModel) => {
      draft.departments = departments;
    });
  }
}
