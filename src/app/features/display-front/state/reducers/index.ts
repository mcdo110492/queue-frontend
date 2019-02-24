import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";

import * as fromMediaReducer from "./media.reducer";
import * as fromTickets from "./tickets.reducer";
import * as fromNews from "./news.reducer";

export interface DisplayState {
  media: fromMediaReducer.State;
  tickets: fromTickets.State;
  news: fromNews.State;
}

export const reducers: ActionReducerMap<DisplayState> = {
  media: fromMediaReducer.reducer,
  tickets: fromTickets.reducer,
  news: fromNews.reducer
};

export const selectDisplayState = createFeatureSelector<DisplayState>(
  "display"
);
