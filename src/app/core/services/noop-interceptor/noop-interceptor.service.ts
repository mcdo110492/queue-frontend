import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";

import { Observable } from "rxjs";
import { flatMap, first } from "rxjs/operators";

import { Store } from "@ngrx/store";

import * as fromUserState from "@core/state/reducers/user.reducer";
import * as fromUserSelectors from "@core/state/selectors/user.selector";

@Injectable({
  providedIn: "root"
})
export class NoopInterceptorService implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(fromUserSelectors.selectToken).pipe(
      first(),
      flatMap(token => {
        const authRequest = !!token
          ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
          : request;
        return next.handle(authRequest);
      })
    );
  }
  constructor(private store: Store<fromUserState.State>) {}
}
