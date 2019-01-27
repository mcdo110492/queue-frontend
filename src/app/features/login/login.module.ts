import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { MaterialCompModule } from "@material/material-comp.module";
import { UiFormlyModule } from "@ui-formly/ui-formly.module";

import * as fromComponents from "./components";

@NgModule({
  declarations: [...fromComponents.components],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    MaterialCompModule,
    UiFormlyModule
  ]
})
export class LoginModule {}
