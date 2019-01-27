import { ActionReducerMap, MetaReducer, ActionReducer } from "@ngrx/store";
import { routerReducer } from "@ngrx/router-store";
import { storeFreeze } from "ngrx-store-freeze";
import { localStorageSync } from "ngrx-store-localstorage";
import { environment } from "@env/environment";

export interface State {
  router: any;
}

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: ["user"], rehydrate: true })(reducer);
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [storeFreeze, localStorageSyncReducer]
  : [localStorageSyncReducer];
