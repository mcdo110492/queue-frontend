import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@shared/shared.module";

import { TokenListRoutingModule } from "./token-list-routing.module";

import * as fromComponents from "./components";
import * as fromServices from "./services";
import * as fromFacades from "./facades";

import { NgxsModule } from "@ngxs/store";
import { TokenListState } from "./state/token-list.state";

@NgModule({
  declarations: [...fromComponents.components],
  imports: [
    CommonModule,
    SharedModule,
    TokenListRoutingModule,
    NgxsModule.forFeature([TokenListState])
  ],
  providers: [...fromServices.services, ...fromFacades.facades]
})
export class TokenListModule {}
