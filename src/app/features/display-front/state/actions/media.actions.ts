import { Action } from "@ngrx/store";
import { MediaModel } from "@features/display-front/models/media.model";

export enum MediaActionTypes {
  LoadMedias = "[Media] Load Medias",
  LoadedMedias = "[Media] Loaded Medias",
  OnServerError = "[Media] On Server Error"
}

export class LoadMedias implements Action {
  readonly type = MediaActionTypes.LoadMedias;
}

export class LoadedMedias implements Action {
  readonly type = MediaActionTypes.LoadedMedias;
  constructor(public payload: MediaModel[]) {}
}

export class OnServerError implements Action {
  readonly type = MediaActionTypes.OnServerError;
  constructor(public payload: any) {}
}

export type MediaActions = LoadMedias | LoadedMedias | OnServerError;
