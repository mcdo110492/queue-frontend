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
        path: "departments",
        loadChildren:
          "src/app/features/departments/departments.module#DepartmentsModule"
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
      {
        path: "queue/my/counter",
        loadChildren:
          "src/app/features/my-counter/my-counter.module#MyCounterModule"
      },
      {
        path: "queue/token/list",
        loadChildren:
          "src/app/features/token-list/token-list.module#TokenListModule"
      },
      {
        path: "queue/token/reports",
        loadChildren: "src/app/features/reports/reports.module#ReportsModule"
      },
      {
        path: "announcement/list",
        loadChildren:
          "src/app/features/announcements/announcements.module#AnnouncementsModule"
      },
      {
        path: "media/ads",
        loadChildren: "src/app/features/media/media.module#MediaModule"
      },

      {
        path: "user/manage",
        loadChildren:
          "src/app/features/user-management/user-management.module#UserManagementModule"
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
