import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "@shared/shared.module";

import { DisplayFrontRoutingModule } from "./display-front-routing.module";

import * as fromComponents from "./components";
import * as fromServices from "./services";
import * as fromFacades from "./facades";

import { NgxsModule } from "@ngxs/store";
import { DisplayFrontState } from "./state/display-front.state";

@NgModule({
  declarations: [...fromComponents.components],
  imports: [
    CommonModule,
    DisplayFrontRoutingModule,
    SharedModule,
    NgxsModule.forFeature([DisplayFrontState])
  ],
  providers: [...fromServices.services, ...fromFacades.facades]
})
export class DisplayFrontModule {}
