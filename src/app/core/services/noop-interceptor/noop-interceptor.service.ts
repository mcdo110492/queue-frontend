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
    const authRequest = !!token
      ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : request;

    return next.handle(authRequest);
  }
  constructor(private facade: AuthFacadesService) {}
}