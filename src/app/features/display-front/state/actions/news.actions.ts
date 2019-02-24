import { Action } from "@ngrx/store";
import { NewsModel } from "@features/display-front/models/news.model";

export enum NewsActionTypes {
  LoadNews = "[News] Load News",
  AddNews = "[News] Add News",
  ClearNews = "[News] Clear News",
  OnServerError = "[News] On Server Error"
}

export class LoadNews implements Action {
  readonly type = NewsActionTypes.LoadNews;
}

export class AddNews implements Action {
  readonly type = NewsActionTypes.AddNews;

  constructor(public payload: { news: NewsModel[] }) {}
}

export class ClearNews implements Action {
  readonly type = NewsActionTypes.ClearNews;
}

export class OnServerError implements Action {
  readonly type = NewsActionTypes.OnServerError;
  constructor(public payload: any) {}
}

export type NewsActions = LoadNews | AddNews | ClearNews | OnServerError;
