import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "@shared/shared.module";

import { MediaRoutingModule } from "./media-routing.module";

import * as fromComponents from "./components";
import * as fromServices from "./services";
import * as fromFacades from "./facades";

import { NgxsModule } from "@ngxs/store";
import { MediaState } from "./state/media.state";

@NgModule({
  declarations: [...fromComponents.components],
  imports: [
    CommonModule,
    MediaRoutingModule,
    SharedModule,
    NgxsModule.forFeature([MediaState])
  ],
  providers: [...fromServices.services, ...fromFacades.facades],
  entryComponents: [...fromComponents.entryComponents]
})
export class MediaModule {}
