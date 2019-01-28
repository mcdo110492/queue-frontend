import { NoopIntercetorService } from "./http-interceptors";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

export const httpInterceptorsProvider = [
  { provide: HTTP_INTERCEPTORS, useClass: NoopIntercetorService, multi: true }
];

export * from "./custom-route-serializer";
