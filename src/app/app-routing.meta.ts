import { Routes } from "@angular/router";

import { LoginComponent } from "@features/login/components";

import {
  PageContainerComponent,
  PageNotFoundComponent,
  DisplayContainerComponent
} from "@core/components";

import { AuthGuard, LoginGuard } from "@core/guards";

export const APP_ROUTES: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  { path: "login", component: LoginComponent, canActivate: [LoginGuard] },
  {
    path: "app",
    component: PageContainerComponent,
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
    component: DisplayContainerComponent,
    children: [
      {
        path: "issue/token",
        loadChildren:
          "src/app/features/issue-token/issue-token.module#IssueTokenModule"
      },
      {
        path: "front/queue",
        loadChildren:
          "src/app/features/display-front/display-front.module#DisplayFrontModule"
      },
      { path: "**", component: PageNotFoundComponent }
    ]
  },
  { path: "**", component: PageNotFoundComponent }
];
