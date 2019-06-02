import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "@env/environment";

import { Observable } from "rxjs";

import {
  MediaGetReponseModel,
  MediaUpdateResponseModel,
  MediaRemoveResponseModel
} from "@features/media/models/media-response.model";
import { MediaModel } from "@features/media/models/media.model";

@Injectable()
export class MediaApiService {
  private baseApi: string = environment.baseApi;

  getMedias(): Observable<MediaGetReponseModel> {
    return this.http.get<MediaGetReponseModel>(`${this.baseApi}/media/all`);
  }

  update(model: MediaModel): Observable<MediaUpdateResponseModel> {
    return this.http.put<MediaUpdateResponseModel>(
      `${this.baseApi}/media/${model.id}`,
      model
    );
  }

  remove(model: MediaModel): Observable<MediaRemoveResponseModel> {
    return this.http.delete<MediaRemoveResponseModel>(
      `${this.baseApi}/media/${model.id}`
    );
  }

  constructor(private http: HttpClient) {}
}
