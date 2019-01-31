import { ActionReducerMap, MetaReducer, ActionReducer } from "@ngrx/store";
import { routerReducer } from "@ngrx/router-store";
import { storeFreeze } from "ngrx-store-freeze";
import { localStorageSync } from "ngrx-store-localstorage";
import { environment } from "@env/environment";

import { routeLoaderreducer } from "./../router-extends/reducer";

export interface State {
  router: any;
  routeLoader: any;
}

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: ["user"], rehydrate: true })(reducer);
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  routeLoader: routeLoaderreducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [storeFreeze, localStorageSyncReducer]
  : [localStorageSyncReducer];
