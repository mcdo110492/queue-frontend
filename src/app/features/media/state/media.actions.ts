import { MediaModel } from "../models/media.model";

export class IsLoading {
  static readonly type = "[Media] Is Loading";
  constructor(public payload: boolean) {}
}

export class IsSaving {
  static readonly type = "[Media] Is Saving";
  constructor(public payload: boolean) {}
}

export class AddMedias {
  static readonly type = "[Media] Add Medias";
  constructor(public payload: { medias: MediaModel[] }) {}
}

export class UpdateMedia {
  static readonly type = "[Media] Update Media";
  constructor(public payload: { media: MediaModel }) {}
}

export class SelectMedia {
  static readonly type = "[Media] Select Media";
  constructor(public payload: number | string) {}
}

export class DoNothingActions {
  static readonly type = "[Media] Do Nothing Actions";
}
