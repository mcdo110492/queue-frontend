import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { UserManagementContainerComponent } from "./components/user-management-container/user-management-container.component";

const routes: Routes = [
  { path: "", component: UserManagementContainerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule {}
