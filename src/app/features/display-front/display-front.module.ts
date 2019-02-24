import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "@shared/shared.module";

import { DisplayFrontRoutingModule } from "./display-front-routing.module";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import * as fromComponents from "./components";
import * as fromServices from "./services";
import * as fromStoreReducers from "./state/reducers";
import * as fromStoreEffects from "./state/effects";

@NgModule({
  declarations: [...fromComponents.components],
  imports: [
    CommonModule,
    DisplayFrontRoutingModule,
    SharedModule,
    StoreModule.forFeature("display", fromStoreReducers.reducers),
    EffectsModule.forFeature([...fromStoreEffects.effects])
  ],
  providers: [...fromServices.services]
})
export class DisplayFrontModule {}
