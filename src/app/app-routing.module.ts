import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MainContentComponent } from "./layout/components";
import { LoginComponent } from "@features/login/components";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  { path: "login", component: LoginComponent },
  { path: "app", component: MainContentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
