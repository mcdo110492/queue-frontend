import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "@shared/shared.module";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import * as fromComponents from "./components";

@NgModule({
  declarations: [...fromComponents.components],
  imports: [CommonModule, DashboardRoutingModule, SharedModule]
})
export class DashboardModule {}
