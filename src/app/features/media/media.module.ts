import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "@shared/shared.module";

import { MediaRoutingModule } from "./media-routing.module";

import * as fromComponents from "./components";
import * as fromServices from "./services";

@NgModule({
  declarations: [...fromComponents.components],
  imports: [CommonModule, MediaRoutingModule, SharedModule],
  providers: [...fromServices.services],
  entryComponents: [...fromComponents.entryComponents]
})
export class MediaModule {}
