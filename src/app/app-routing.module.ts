import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PageNotFoundComponent } from "./components";

import { MainContentComponent, DisplayComponent } from "./layout/components";
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
      {
        path: "counter/assigned/user",
        loadChildren:
          "src/app/features/counter-user/counter-user.module#CounterUserModule"
      },
      { path: "**", component: PageNotFoundComponent }
    ]
  },
  {
    path: "display",
    component: DisplayComponent,
    children: [
      {
        path: "issue/token",
        loadChildren:
          "src/app/features/issue-token/issue-token.module#IssueTokenModule"
      },
      {
        path: "front/queue",
        loadChildren:
          "src/app/features/queue-front-display/queue-front-display.module#QueueFrontDisplayModule"
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
