import { TokenListModel } from "../models/token-list.model";

export class AddTokenLists {
  static readonly type = "[TokenList] Add Token Lists";
  constructor(public payload: { tokens: TokenListModel[] }) {}
}

export class IsLoading {
  static readonly type = "[TokenList] Is Loading";
  constructor(public payload: boolean) {}
}

export class DoNothingAction {
  static readonly type = "[TokenList] Do Nothin Action";
}
