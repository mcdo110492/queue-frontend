import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";

import { Observable } from "rxjs";

import { AuthFacadesService } from "@core/facades/auth-facades.service";

@Injectable({
  providedIn: "root"
})
export class NoopInterceptorService implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.facade.tokenSnapshot();
    const socketId = this.facade.socketIdSnapShot();

    const authRequest = !!token
      ? request.clone({
          setHeaders: this.setCustomHeaders(token, socketId)
        })
      : request;

    return next.handle(authRequest);
  }

  private setCustomHeaders(token: any, socketId: any) {
    if (socketId) {
      return {
        Authorization: `Bearer ${token}`,
        "X-Socket-ID": socketId
      };
    }
    return {
      Authorization: `Bearer ${token}`
    };
  }
  constructor(private facade: AuthFacadesService) {}
}
