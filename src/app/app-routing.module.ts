import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PageNotFoundComponent } from "./components";

import { MainContentComponent } from "./layout/components";
import { LoginComponent } from "@features/login/components";
import { AuthGuard, LoginGuard } from "@guards/index";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  { path: "login", component: LoginComponent, canActivate: [LoginGuard] },
  {
    path: "app",
    component: MainContentComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "dashboard",
        loadChildren:
          "src/app/features/dashboard/dashboard.module#DashboardModule"
      },
      {
        path: "counter/list",
        loadChildren: "src/app/features/counter/counter.module#CounterModule"
      },
      { path: "**", component: PageNotFoundComponent }
    ]
  },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
