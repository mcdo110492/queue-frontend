import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MyCounterRoutingModule } from "./my-counter-routing.module";

import { SharedModule } from "@shared/shared.module";

import * as fromComponents from "./components";
import * as fromServices from "./services";

import { StoreModule } from "@ngrx/store";
import * as fromMyCounterReducer from "./state/reducers";

@NgModule({
  declarations: [...fromComponents.COMPONENTS],
  imports: [
    CommonModule,
    MyCounterRoutingModule,
    SharedModule,
    StoreModule.forFeature("myCounter", fromMyCounterReducer.reducers)
  ],
  providers: [...fromServices.SERVICES]
})
export class MyCounterModule {}
