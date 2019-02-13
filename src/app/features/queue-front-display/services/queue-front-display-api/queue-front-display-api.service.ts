import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "@env/environment";

import { Observable } from "rxjs";

import { IMediaModel } from "./../../models";

@Injectable()
export class QueueFrontDisplayApiService {
  private baseApi: string = environment.baseApi;

  getMedia(): Observable<{ payload: IMediaModel[] }> {
    return this.http.get<{ payload: IMediaModel[] }>(
      `${this.baseApi}/api/media/files`
    );
  }
  constructor(private http: HttpClient) {}
}
