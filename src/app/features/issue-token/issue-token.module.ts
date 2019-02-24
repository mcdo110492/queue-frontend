import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "@shared/shared.module";
import { UiFormlyModule } from "@ui-formly/ui-formly.module";

import { IssueTokenRoutingModule } from "./issue-token-routing.module";

import * as fromComponents from "./components";
import * as fromServices from "./services";

import { StoreModule } from "@ngrx/store";
import * as fromStoreReducers from "./state/reducers/issue-token.reducer";
import { EffectsModule } from "@ngrx/effects";
import * as fromStoreEffects from "./state/effects/issue-token.effects";

@NgModule({
  declarations: [...fromComponents.components],
  imports: [
    CommonModule,
    IssueTokenRoutingModule,
    SharedModule,
    UiFormlyModule,
    StoreModule.forFeature("issue-token", fromStoreReducers.reducer),
    EffectsModule.forFeature([fromStoreEffects.IssueTokenEffects])
  ],
  providers: [...fromServices.services],
  entryComponents: [...fromComponents.entryComponents]
})
export class IssueTokenModule {}
