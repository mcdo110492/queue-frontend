import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "@shared/shared.module";
import { UiFormlyModule } from "@ui-formly/ui-formly.module";

import { AnnouncementsRoutingModule } from "./announcements-routing.module";

import * as fromComponents from "./components";
import * as fromServices from "./services";
import * as fromFacades from "./facade";

import { NgxsModule } from "@ngxs/store";
import { AnnouncementsState } from "./state/announcements.state";

@NgModule({
  declarations: [...fromComponents.components],
  imports: [
    CommonModule,
    AnnouncementsRoutingModule,
    SharedModule,
    UiFormlyModule,
    NgxsModule.forFeature([AnnouncementsState])
  ],
  entryComponents: [...fromComponents.entryComponents],
  providers: [...fromServices.services, ...fromFacades.facades]
})
export class AnnouncementsModule {}
