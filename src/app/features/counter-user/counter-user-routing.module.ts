import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CounterUserListComponent } from "./components";

const routes: Routes = [{ path: "", component: CounterUserListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CounterUserRoutingModule {}
