import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "@env/environment";

import { Observable } from "rxjs";

import { AnnouncementModel } from "./../../models/announcement.model";

@Injectable()
export class AnnouncementsApiService {
  private baseApi: string = environment.baseApi;

  getLists(): Observable<{ payload: { data: AnnouncementModel[] } }> {
    return this.http.get<{ payload: { data: AnnouncementModel[] } }>(
      `${this.baseApi}/announcements`
    );
  }

  create(
    model: AnnouncementModel
  ): Observable<{ payload: { data: AnnouncementModel } }> {
    return this.http.post<{ payload: { data: AnnouncementModel } }>(
      `${this.baseApi}/announcements`,
      model
    );
  }

  update(
    model: AnnouncementModel
  ): Observable<{ payload: { data: AnnouncementModel } }> {
    return this.http.put<{ payload: { data: AnnouncementModel } }>(
      `${this.baseApi}/announcements/${model.id}`,
      model
    );
  }

  constructor(private http: HttpClient) {}
}
