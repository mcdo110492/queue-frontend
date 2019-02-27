import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MyCounterContainerComponent } from "./components";

const routes: Routes = [{ path: "", component: MyCounterContainerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyCounterRoutingModule {}
