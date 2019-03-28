import { NgModule, Optional, SkipSelf } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from "@angular/material/snack-bar";

import { throwIfAlreadyLoaded } from "./guards/module-import-guard";
import { environment } from "@env/environment";

import { NgxsModule } from "@ngxs/store";
import {
  NgxsRouterPluginModule,
  RouterStateSerializer
} from "@ngxs/router-plugin";
import { NgxsDispatchPluginModule } from "@ngxs-labs/dispatch-decorator";
import { NgxsStoragePluginModule } from "@ngxs/storage-plugin";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";

import { AuthState } from "./state/auth.state";
import { LayoutState } from "./state/layout.state";

import * as fromComponents from "./components";
import * as fromClasses from "./class";

import { NoopInterceptorService } from "./services/noop-interceptor/noop-interceptor.service";

import { LoginModule } from "@features/login/login.module";
import { SharedModule } from "@shared/shared.module";

@NgModule({
  declarations: [...fromComponents.COMPONENTS],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    NgxsModule.forRoot([AuthState, LayoutState], {
      developmentMode: !environment.production
    }),
    NgxsRouterPluginModule.forRoot(),
    NgxsDispatchPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({ key: ["auth.user"] }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production,
      maxAge: 10
    }),
    LoginModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NoopInterceptorService,
      multi: true
    },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
    {
      provide: RouterStateSerializer,
      useClass: fromClasses.CustomRouteSerializer
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, "CoreModule");
  }
}
