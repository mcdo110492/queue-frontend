import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "@shared/shared.module";
import { UiFormlyModule } from "@ui-formly/ui-formly.module";

import { UserManagementRoutingModule } from "./user-management-routing.module";

import * as fromComponents from "./components";
import * as fromServices from "./services";
import * as fromFacades from "./facades";

import { NgxsModule } from "@ngxs/store";
import { UserManagementState } from "./state/user-management.state";

@NgModule({
  declarations: [...fromComponents.components],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    SharedModule,
    UiFormlyModule,
    NgxsModule.forFeature([UserManagementState])
  ],
  providers: [...fromServices.services, ...fromFacades.facades],
  entryComponents: [...fromComponents.entryComponents]
})
export class UserManagementModule {}
