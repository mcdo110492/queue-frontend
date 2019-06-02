import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TokenListContainerComponent } from "./components/token-list-container/token-list-container.component";

const routes: Routes = [{ path: "", component: TokenListContainerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TokenListRoutingModule {}
