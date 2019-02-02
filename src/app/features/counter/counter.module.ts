import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MaterialCompModule } from "@material/index";
import { SharedModule } from "@shared/shared.module";

import { CounterRoutingModule } from "./counter-routing.module";
import * as fromComponents from "./components";

@NgModule({
  declarations: [...fromComponents.components],
  imports: [
    CommonModule,
    CounterRoutingModule,
    MaterialCompModule,
    SharedModule
  ]
})
export class CounterModule {}
