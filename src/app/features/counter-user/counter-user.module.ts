import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "@shared/shared.module";
import { UiFormlyModule } from "@ui-formly/ui-formly.module";

import { CounterUserRoutingModule } from "./counter-user-routing.module";

import * as fromComponents from "./components";
import * as fromServices from "./services";
import * as fromFacades from "./facades";

import { NgxsModule } from "@ngxs/store";
import { CounterUserState } from "./state/counter-user.state";

@NgModule({
  declarations: [...fromComponents.components],
  imports: [
    CommonModule,
    CounterUserRoutingModule,
    SharedModule,
    UiFormlyModule,
    NgxsModule.forFeature([CounterUserState])
  ],
  entryComponents: [...fromComponents.entryComponents],
  providers: [...fromServices.services, ...fromFacades.facades]
})
export class CounterUserModule {}
