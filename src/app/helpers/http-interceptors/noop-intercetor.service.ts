import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";

import { Store } from "@ngrx/store";
import * as fromUserSelector from "@user-store/store/selector";
import * as fromUserState from "@user-store/store/state";
import { flatMap, first } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class NoopIntercetorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //Get the token from the user store
    return this.store.select(fromUserSelector.selectUserToken).pipe(
      first(),
      flatMap(token => {
        const authReq = !!token
          ? req.clone({
              setHeaders: { Authorization: `Bearer ${token}` }
            })
          : req;
        return next.handle(authReq);
      })
    );
  }

  constructor(private store: Store<fromUserState.State>) {}
}
