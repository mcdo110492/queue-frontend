import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { APP_ROUTES } from "./app-routing.meta";

const routes: Routes = APP_ROUTES;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
