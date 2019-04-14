import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";

import { environment } from "@env/environment";
import { AnnouncementModel } from "@features/display-front/models";

interface ResponseModel {
  payload: { data: AnnouncementModel[] };
}

@Injectable()
export class AnnouncementApiService {
  private baseApi: string = environment.baseApi;

  getVisible() {
    return this.http.get<ResponseModel>(
      `${this.baseApi}/announcements/visible`
    );
  }

  constructor(private http: HttpClient) {}
}
