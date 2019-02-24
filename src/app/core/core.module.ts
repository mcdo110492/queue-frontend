import { NgModule, Optional, SkipSelf } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from "@angular/material/snack-bar";

import { throwIfAlreadyLoaded } from "./guards/module-import-guard";
import { environment } from "@env/environment";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import {
  StoreRouterConnectingModule,
  NavigationActionTiming
} from "@ngrx/router-store";

import * as fromComponents from "./components";
import * as fromClasses from "./class";
import { reducers, metaReducers } from "./state/reducers";
import * as fromStateEffects from "./state/effects";

import { NoopInterceptorService } from "./services/noop-interceptor/noop-interceptor.service";

import { LoginModule } from "@features/login/login.module";
import { SharedModule } from "@shared/shared.module";

@NgModule({
  declarations: [...fromComponents.COMPONENTS],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([...fromStateEffects.EFFECTS]),
    !environment.production
      ? StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: true })
      : [],
    StoreRouterConnectingModule.forRoot({
      serializer: fromClasses.CustomRouteSerializer,
      navigationActionTiming: NavigationActionTiming.PostActivation
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
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, "CoreModule");
  }
}
