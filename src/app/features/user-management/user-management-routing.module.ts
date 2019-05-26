import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { UserManagementTableComponent } from "./components";

const routes: Routes = [{ path: "", component: UserManagementTableComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule {}
