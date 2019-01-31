import { SidenavMetadataModel } from "./../models";

export const ADMINISTRATOR_LINKS: SidenavMetadataModel[] = [
  {
    isHeader: false,
    link: "/dashboard",
    title: "Dashboard",
    icon: "dashboard"
  },
  { isHeader: true, link: "", title: "Counter" },
  {
    isHeader: false,
    link: "/counter/list",
    title: "Counter List",
    icon: "view_list"
  },
  {
    isHeader: false,
    link: "/counter/user",
    title: "Assigned User",
    icon: "supervised_user_circle"
  },
  { isHeader: true, link: "", title: "Queueing" },
  {
    isHeader: false,
    link: "/queue/token/list",
    title: "Token List",
    icon: "assignment"
  },
  {
    isHeader: false,
    link: "/queue/token/reports",
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
    link: "/announcements",
    title: "Announcements",
    icon: "announcement"
  },
  { isHeader: false, link: "/media/ads", title: "Media Ads", icon: "live_tv" },
  { isHeader: true, link: "", title: "Settings" },
  {
    isHeader: false,
    link: "/settings/profile",
    title: "Profile Settings",
    icon: "settings"
  }
];
