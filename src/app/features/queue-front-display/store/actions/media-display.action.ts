import { Action } from "@ngrx/store";
import { Update } from "@ngrx/entity";

import { IMediaModel } from "../../models/media.model";

export enum MediaDisplayActionTypes {
  LOAD_MEDIA = "[Queue Front Display] Load Media",
  ADD_MEDIAS = "[Queue Front Display] Add Medias",
  ON_SERVER_ERROR = "[Queue Front Display] On Server Error"
}

export class LoadMedia implements Action {
  readonly type = MediaDisplayActionTypes.LOAD_MEDIA;
}

export class AddMedias implements Action {
  readonly type = MediaDisplayActionTypes.ADD_MEDIAS;
  constructor(public payload: { medias: IMediaModel[] }) {}
}

export class OnServerError implements Action {
  readonly type = MediaDisplayActionTypes.ON_SERVER_ERROR;
  constructor(public payload: any) {}
}

export type MediaDisplayActions = LoadMedia | AddMedias | OnServerError;
