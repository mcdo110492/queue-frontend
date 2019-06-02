import { SideBarLinksModel } from "../models";

export const COUNTER_LINKS: SideBarLinksModel[] = [
  {
    isHeader: false,
    link: "/app/my/dashboard",
    title: "Dashboard",
    icon: "dashboard"
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
    link: "/app/queue/token/reports",
    title: "Reports",
    icon: "assessment"
  },
  { isHeader: true, link: "", title: "Settings" },
  {
    isHeader: false,
    link: "/app/settings/profile",
    title: "Profile Settings",
    icon: "settings"
  }
];
