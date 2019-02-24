import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "@shared/shared.module";
import { UiFormlyModule } from "@ui-formly/ui-formly.module";

import { CounterUserRoutingModule } from "./counter-user-routing.module";

import * as fromComponents from "./components";
import * as fromServices from "./services";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import * as fromState from "./state";

@NgModule({
  declarations: [...fromComponents.components],
  imports: [
    CommonModule,
    CounterUserRoutingModule,
    SharedModule,
    UiFormlyModule,
    StoreModule.forFeature("counter-user", fromState.reducer),
    EffectsModule.forFeature([...fromState.effects])
  ],
  entryComponents: [...fromComponents.entryComponents],
  providers: [...fromServices.services]
})
export class CounterUserModule {}
