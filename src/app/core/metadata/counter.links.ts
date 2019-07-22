import { SideBarLinksModel } from "../models";

export const COUNTER_LINKS: SideBarLinksModel[] = [
  { isHeader: true, link: "", title: "Queueing" },
  {
    isHeader: false,
    link: "/app/queue/my/counter",
    title: "My Counter",
    icon: "collections"
  },
  { isHeader: true, link: "", title: "Settings" },
  {
    isHeader: false,
    link: "/app/settings/profile",
    title: "Profile Settings",
    icon: "settings"
  }
];
