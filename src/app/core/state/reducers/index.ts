import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from "@ngrx/store";
import { routerReducer } from "@ngrx/router-store";
import { storeFreeze } from "ngrx-store-freeze";
import { localStorageSync } from "ngrx-store-localstorage";

import { environment } from "@env/environment";

import { routerExtendsReducer } from "./router-extends.reducer";
import { userReducer } from "./user.reducer";
import { layoutReducer } from "./layout.reducer";

export interface State {
  router: any;
  "route-loader": any;
  user: any;
  layout: any;
}

export function localStorageSyncReducers(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: ["user"], rehydrate: true })(reducer);
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  "route-loader": routerExtendsReducer,
  user: userReducer,
  layout: layoutReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [storeFreeze, localStorageSyncReducers]
  : [localStorageSyncReducers];
