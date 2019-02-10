import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { IssueTokenViewComponent } from "./components";

const routes: Routes = [{ path: "", component: IssueTokenViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssueTokenRoutingModule {}
