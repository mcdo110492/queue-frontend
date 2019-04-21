import { AnnouncementModel } from "../models/announcement.model";

export class AddAnnouncement {
  static readonly type = "[Announcement] Add Announcement";
  constructor(public payload: { announcements: AnnouncementModel }) {}
}

export class IsLoading {
  static readonly type = "[Announcement] Is Loading";
  constructor(public payload: boolean) {}
}

export class IsSaving {
  static readonly type = "[Announcement] Is Saving";
  constructor(public payload: boolean) {}
}

export class AddAnnouncements {
  static readonly type = "[Announcement] Add Announcements";
  constructor(public payload: { announcements: AnnouncementModel[] }) {}
}

export class UpdateAnnouncement {
  static readonly type = "[Announcement] Update Announcement";
  constructor(public payload: { announcement: AnnouncementModel }) {}
}

export class SelectAnnouncement {
  static readonly type = "[Announcement] Select Announcement";
  constructor(public payload: number | string) {}
}
