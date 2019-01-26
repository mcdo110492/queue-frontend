import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { MaterialCompModule } from "@material/index";
import * as fromComponents from "./components";

import { StoreModule } from "@ngrx/store";
import { reducer } from "./store";

@NgModule({
  declarations: [...fromComponents.components],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    MaterialCompModule,
    StoreModule.forFeature("layout", reducer)
  ],
  exports: [...fromComponents.components]
})
export class LayoutModule {}
