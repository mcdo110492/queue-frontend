import { MediaModel } from "./media.model";

export interface MediaGetReponseModel {
  payload: { data: MediaModel[] };
}

export interface MediaUpdateResponseModel {
  payload: { data: MediaModel };
}
