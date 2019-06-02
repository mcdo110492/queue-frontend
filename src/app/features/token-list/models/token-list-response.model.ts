import { TokenListModel } from "./token-list.model";

export interface TokenListGetResponseModel {
  payload: { data: TokenListModel[] };
}
