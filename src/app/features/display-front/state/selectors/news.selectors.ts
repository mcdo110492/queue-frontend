import { createSelector } from "@ngrx/store";
import * as fromDisplayReducer from "./../reducers";
import * as fromNewsReducer from "./../reducers/news.reducer";

const selectNewsState = (state: fromDisplayReducer.DisplayState) => state.news;

export const selectNewsIsLoading = createSelector(
  selectNewsState,
  fromNewsReducer.selectIsLoading
);

export const selectAllNews = createSelector(
  selectNewsState,
  fromNewsReducer.selectAll
);
