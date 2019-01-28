import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { MaterialCompModule } from "@material/material-comp.module";
import { UiFormlyModule } from "@ui-formly/ui-formly.module";

import * as fromComponents from "./components";
import * as fromServices from "./services";

@NgModule({
  declarations: [...fromComponents.components],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    MaterialCompModule,
    UiFormlyModule
  ],
  providers: [...fromServices.services]
})
export class LoginModule {}
