import { AnnouncementModel, MediaModel, TokenModel } from "../models/";

export class IsAnnouncementLoading {
  static readonly type = "[DisplayFront] Is Announcement Loading";
  constructor(public payload: boolean) {}
}

export class IsMedialLoading {
  static readonly type = "[DisplayFront] Is Media Loading";
  constructor(public payload: boolean) {}
}

export class IsTokenLoading {
  static readonly type = "[DisplayFront] Is Token Loading";
  constructor(public payload: boolean) {}
}

export class AddAnnouncements {
  static readonly type = "[DisplayFront] Add Announcements";
  constructor(public payload: { announcements: AnnouncementModel[] }) {}
}

export class AddMedias {
  static readonly type = "[DisplayFront] Add Medias";
  constructor(public payload: { medias: MediaModel[] }) {}
}

export class AddTokens {
  static readonly type = "[DisplayFront] Add Tokens";
  constructor(public payload: { tokens: TokenModel[] }) {}
}

export class AddToken {
  static readonly type = "[DisplayFront] Add Token";
  constructor(public payload: { token: TokenModel }) {}
}

export class OnServerSuccess {
  static readonly type = "[DisplayFront] On Server Success";
  constructor(public payload: any) {}
}

export class OnServerError {
  static readonly type = "[DisplayFront] On Server Error";
  constructor(public payload: any) {}
}
