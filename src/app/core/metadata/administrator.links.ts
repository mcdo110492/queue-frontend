import { SideBarLinksModel } from "../models";

export const ADMINISTRATOR_LINKS: SideBarLinksModel[] = [
  {
    isHeader: false,
    link: "/app/dashboard",
    title: "Dashboard",
    icon: "dashboard"
  },
  {
    isHeader: false,
    link: "/app/departments",
    title: "Departments",
    icon: "view_list"
  },
  { isHeader: true, link: "", title: "Counter" },
  {
    isHeader: false,
    link: "/app/counter/list",
    title: "Counter List",
    icon: "view_list"
  },
  {
    isHeader: false,
    link: "/app/counter/assigned/user",
    title: "Assigned User",
    icon: "supervised_user_circle"
  },
  { isHeader: true, link: "", title: "Queueing" },
  {
    isHeader: false,
    link: "/app/queue/my/counter",
    title: "My Counter",
    icon: "collections"
  },
  {
    isHeader: false,
    link: "/app/queue/token/list",
    title: "Token List",
    icon: "assignment"
  },
  {
    isHeader: false,
    link: "/app/queue/token/reports",
    title: "Reports",
    icon: "assessment"
  },
  { isHeader: true, link: "", title: "Display Links" },
  {
    isHeader: false,
    link: "/display/issue/token",
    title: "Issue Token",
    icon: "receipt"
  },
  {
    isHeader: false,
    link: "/display/front/queue",
    title: "Front Queue",
    icon: "tv"
  },
  { isHeader: true, link: "", title: "Advertisement" },
  {
    isHeader: false,
    link: "/app/announcement/list",
    title: "Announcements",
    icon: "announcement"
  },
  {
    isHeader: false,
    link: "/app/media/ads",
    title: "Media Ads",
    icon: "live_tv"
  },
  { isHeader: true, link: "", title: "User Settings" },
  {
    isHeader: false,
    link: "/app/user/manage",
    title: "User Management",
    icon: "supervised_user_circle"
  },
  { isHeader: true, link: "", title: "Settings" },

  {
    isHeader: false,
    link: "/app/settings/system",
    title: "System Settings",
    icon: "power_settings_new"
  },
  {
    isHeader: false,
    link: "/app/settings/profile",
    title: "Profile Settings",
    icon: "settings"
  }
];
