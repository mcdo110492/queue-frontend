import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { MaterialCompModule } from "@material/material-comp.module";
import { SharedModule } from "@shared/shared.module";

import { QueueFrontDisplayRoutingModule } from "./queue-front-display-routing.module";

import * as fromComponents from "./components";
import * as fromServices from "./services";
import * as fromStoreReducer from "./store/reducers";
import * as fromStoreEffects from "./store/effects";

@NgModule({
  declarations: [...fromComponents.components],
  imports: [
    CommonModule,
    QueueFrontDisplayRoutingModule,
    MaterialCompModule,
    SharedModule,
    StoreModule.forFeature("display", fromStoreReducer.reducers),
    EffectsModule.forFeature([...fromStoreEffects.effects])
  ],
  providers: [...fromServices.services]
})
export class QueueFrontDisplayModule {}
