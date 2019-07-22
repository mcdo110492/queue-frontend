import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@shared/shared.module";

import { ReportsRoutingModule } from "./reports-routing.module";

import * as fromComponents from "./components";
import * as fromServices from "./services";
import * as fromFacades from "./facades";

import { NgxsModule } from "@ngxs/store";
import { ReportsState } from "./state/reports.state";

@NgModule({
  declarations: [...fromComponents.components],
  imports: [
    CommonModule,
    SharedModule,
    ReportsRoutingModule,
    NgxsModule.forFeature([ReportsState])
  ],
  providers: [...fromServices.services, ...fromFacades.facades]
})
export class ReportsModule {}
