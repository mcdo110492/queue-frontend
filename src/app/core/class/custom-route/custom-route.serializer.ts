import { Params, RouterStateSnapshot } from "@angular/router";

import { RouterStateSerializer } from "@ngxs/router-plugin";

export interface RouterStateParams {
  url: string;
  params: Params;
  queryParams: Params;
}

export class CustomRouteSerializer
  implements RouterStateSerializer<RouterStateParams> {
  serialize(routerState: RouterStateSnapshot): RouterStateParams {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const {
      url,
      root: { queryParams }
    } = routerState;
    const { params } = route;

    return { url, params, queryParams };
  }
}
