import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MyCounterRoutingModule } from "./my-counter-routing.module";

import { SharedModule } from "@shared/shared.module";

import * as fromComponents from "./components";
import * as fromServices from "./services";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import * as fromState from "./state";
import * as fromEffectsState from "./state/effects";

@NgModule({
  declarations: [...fromComponents.COMPONENTS],
  imports: [
    CommonModule,
    MyCounterRoutingModule,
    SharedModule,
    StoreModule.forFeature("myCounter", fromState.reducers),
    EffectsModule.forFeature([...fromEffectsState.EFFECTS])
  ],
  providers: [...fromServices.SERVICES]
})
export class MyCounterModule {}
