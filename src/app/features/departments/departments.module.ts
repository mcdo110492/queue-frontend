import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "@shared/shared.module";
import { UiFormlyModule } from "@ui-formly/ui-formly.module";

import { DepartmentsRoutingModule } from "./departments-routing.module";

import * as fromComponents from "./components";
import * as fromServices from "./services";
import * as fromFacades from "./facades";

import { NgxsModule } from "@ngxs/store";
import { DepartmentsState } from "./state/departments.state";

@NgModule({
  declarations: [...fromComponents.components],
  imports: [
    CommonModule,
    DepartmentsRoutingModule,
    SharedModule,
    UiFormlyModule,
    NgxsModule.forFeature([DepartmentsState])
  ],
  providers: [...fromServices.services, ...fromFacades.facades],
  entryComponents: [...fromComponents.entryComponents]
})
export class DepartmentsModule {}
