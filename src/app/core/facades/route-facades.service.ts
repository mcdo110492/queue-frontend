import { Injectable } from "@angular/core";

import { Dispatch } from "@ngxs-labs/dispatch-decorator";
import { Navigate } from "@ngxs/router-plugin";
import { Params, NavigationExtras } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class RouteFacadesService {
  @Dispatch() navigate = (
    path: any[],
    queryParams?: Params | undefined,
    extras?: NavigationExtras | undefined
  ) => new Navigate(path, queryParams, extras);
}
