import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { IssueTokenViewComponent, IssueTokenFormComponent } from "./components";

const routes: Routes = [
  { path: "", component: IssueTokenViewComponent },
  {
    path: "select/:department_id/:department_name",
    component: IssueTokenFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssueTokenRoutingModule {}
