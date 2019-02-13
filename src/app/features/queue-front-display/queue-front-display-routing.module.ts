import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { QueueViewComponent } from "./components";

const routes: Routes = [{ path: "", component: QueueViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueueFrontDisplayRoutingModule {}
