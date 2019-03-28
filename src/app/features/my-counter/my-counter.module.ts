import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MyCounterRoutingModule } from "./my-counter-routing.module";

import { SharedModule } from "@shared/shared.module";

import * as fromComponents from "./components";
import * as fromServices from "./services";
import * as fromFacades from "./facades";

import { NgxsModule } from "@ngxs/store";
import { TokenState } from "./state/token.state";

@NgModule({
  declarations: [...fromComponents.COMPONENTS],
  imports: [
    CommonModule,
    MyCounterRoutingModule,
    NgxsModule.forFeature([TokenState]),
    SharedModule
  ],
  providers: [...fromServices.services, ...fromFacades.facades]
})
export class MyCounterModule {}
