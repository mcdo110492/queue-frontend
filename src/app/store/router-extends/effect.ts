import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import {
  ROUTER_REQUEST,
  ROUTER_NAVIGATED,
  ROUTER_CANCEL,
  ROUTER_ERROR
} from "@ngrx/router-store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { StartNavigating, EndNavigating } from "./action";

@Injectable()
export class RouterExtendsEffects {
  @Effect()
  routerRequest$: Observable<any> = this.actions$.pipe(
    ofType(ROUTER_REQUEST),
    map(() => new StartNavigating())
  );

  @Effect()
  routerFinish$: Observable<any> = this.actions$.pipe(
    ofType(ROUTER_NAVIGATED || ROUTER_CANCEL || ROUTER_ERROR),
    map(() => new EndNavigating())
  );

  constructor(private actions$: Actions) {}
}
