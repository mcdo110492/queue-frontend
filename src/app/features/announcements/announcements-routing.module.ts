import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AnnouncementsListComponent } from "./components/announcements-list/announcements-list.component";

const routes: Routes = [{ path: "", component: AnnouncementsListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnouncementsRoutingModule {}
