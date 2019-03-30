import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "@shared/shared.module";
import { UiFormlyModule } from "@ui-formly/ui-formly.module";

import { IssueTokenRoutingModule } from "./issue-token-routing.module";

import * as fromComponents from "./components";
import * as fromServices from "./services";
import * as fromFacades from "./facades";

import { NgxsModule } from "@ngxs/store";
import { IssueTokenState } from "./state/issue-token.state";

@NgModule({
  declarations: [...fromComponents.components],
  imports: [
    CommonModule,
    IssueTokenRoutingModule,
    SharedModule,
    UiFormlyModule,
    NgxsModule.forFeature([IssueTokenState])
  ],
  providers: [...fromServices.services, ...fromFacades.facades],
  entryComponents: [...fromComponents.entryComponents]
})
export class IssueTokenModule {}
