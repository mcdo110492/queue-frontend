import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MatProgressBarModule } from "@angular/material/progress-bar";

import { environment } from "@env/environment.ts";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import {
  StoreRouterConnectingModule,
  NavigationActionTiming
} from "@ngrx/router-store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { reducers, metaReducers } from "./store/reducers";
import { RouterExtendsEffects } from "./store/router-extends/effect";
import {
  CustomRouteSerializer,
  httpInterceptorsProvider
} from "@helpers/index";

import { LayoutModule } from "./layout/layout.module";
import { UserStoreModule } from "./user-store/user-store.module";
import { LoginModule } from "@features/login/login.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([RouterExtendsEffects]),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomRouteSerializer,
      navigationActionTiming: NavigationActionTiming.PostActivation
    }),

    !environment.production
      ? StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: true })
      : [],
    LayoutModule,
    LoginModule,
    UserStoreModule,
    MatProgressBarModule
  ],
  providers: [httpInterceptorsProvider],
  bootstrap: [AppComponent]
})
export class AppModule {}
