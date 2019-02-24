import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { NewsActions, NewsActionTypes } from "../actions/news.actions";

import { NewsModel } from "@features/display-front/models/news.model";

export interface State extends EntityState<NewsModel> {
  isLoading: boolean;
}

export const adapter: EntityAdapter<NewsModel> = createEntityAdapter<
  NewsModel
>();

export const initialState: State = adapter.getInitialState({
  isLoading: false
});

export function reducer(state = initialState, action: NewsActions): State {
  switch (action.type) {
    case NewsActionTypes.LoadNews: {
      return { ...state, isLoading: true };
    }
    case NewsActionTypes.AddNews: {
      return adapter.addMany(action.payload.news, {
        ...state,
        isLoading: false
      });
    }

    case NewsActionTypes.ClearNews: {
      return adapter.removeAll(state);
    }
    case NewsActionTypes.OnServerError: {
      return { ...state, isLoading: false };
    }

    default: {
      return state;
    }
  }
}

export const { selectAll } = adapter.getSelectors();

export const selectIsLoading = (state: State) => state.isLoading;
