import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "@env/environment";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { MediaModel } from "@features/display-front/models/media.model";

@Injectable()
export class MediaApiService {
  getMedias(): Observable<MediaModel[]> {
    return this.http
      .get<{ payload: MediaModel[] }>(`${environment.baseApi}/media/files`)
      .pipe(map(res => res.payload));
  }

  constructor(private http: HttpClient) {}
}
