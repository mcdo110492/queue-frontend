import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { environment } from "@env/environment.ts";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import {
  StoreRouterConnectingModule,
  NavigationActionTiming
} from "@ngrx/router-store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { reducers, metaReducers } from "./store/reducers";
import { CustomRouteSerializer } from "@helpers/custom-route-serializer/custom-route-serializer";

import { LayoutModule } from "./layout/layout.module";
import { UserStoreModule } from "./user-store/user-store.module";
import { LoginModule } from "@features/login/login.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    // StoreRouterConnectingModule.forRoot({
    //   serializer: CustomRouteSerializer,
    //   navigationActionTiming: NavigationActionTiming.PostActivation
    // }),
    EffectsModule.forRoot([]),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production
      ? StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: true })
      : [],
    LayoutModule,
    LoginModule,
    UserStoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
