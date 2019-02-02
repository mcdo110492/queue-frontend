import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MaterialCompModule } from "@material/index";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import * as fromComponents from "./components";

@NgModule({
  declarations: [...fromComponents.components],
  imports: [CommonModule, DashboardRoutingModule, MaterialCompModule]
})
export class DashboardModule {}
