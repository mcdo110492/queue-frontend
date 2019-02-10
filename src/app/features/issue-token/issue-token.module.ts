import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MaterialCompModule } from "@material/material-comp.module";
import { SharedModule } from "@shared/shared.module";
import { UiFormlyModule } from "@ui-formly/ui-formly.module";

import { IssueTokenRoutingModule } from "./issue-token-routing.module";

import * as fromComponents from "./components";
import * as fromServices from "./services";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import * as fromStoreReducers from "./store/reducers/issue-token.reducer";
import * as fromStoreEffects from "./store/effects/issue-token.effects";

@NgModule({
  declarations: [...fromComponents.components],
  imports: [
    CommonModule,
    IssueTokenRoutingModule,
    MaterialCompModule,
    SharedModule,
    UiFormlyModule,
    StoreModule.forFeature("issue-token", fromStoreReducers.reducer),
    EffectsModule.forFeature([fromStoreEffects.IssueTokenEffects])
  ],
  providers: [...fromServices.services],
  entryComponents: [...fromComponents.entryComponents]
})
export class IssueTokenModule {}
