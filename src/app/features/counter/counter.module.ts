import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "@shared/shared.module";
import { UiFormlyModule } from "@ui-formly/ui-formly.module";

import { CounterRoutingModule } from "./counter-routing.module";

import * as fromComponents from "./components";
import * as fromServices from "./services";
import * as fromFacades from "./facades";

import { NgxsModule } from "@ngxs/store";
import { CounterState } from "./state/counter.state";

@NgModule({
  declarations: [...fromComponents.components],
  imports: [
    CommonModule,
    CounterRoutingModule,
    SharedModule,
    UiFormlyModule,
    NgxsModule.forFeature([CounterState])
  ],
  providers: [...fromServices.services, ...fromFacades.facades],
  entryComponents: [...fromComponents.entryComponents]
})
export class CounterModule {}
