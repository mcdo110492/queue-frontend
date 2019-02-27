import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "@env/environment";

import { TokenModel, ActivityLogModel } from "../models";

interface ResponseResource {
  payload: { message?: string; data: ActivityLogModel[] };
}

@Injectable()
export class MyCounterApiService {
  private baseApi: string = environment.baseApi;

  getNowPending() {
    return this.http.get<{ payload: { data: TokenModel[] } }>(
      `${this.baseApi}/tickets/pending`
    );
  }

  getUserLogs() {
    return this.http.get<{ payload: { data: ActivityLogModel[] } }>(
      `${this.baseApi}/tickets/user/logs`
    );
  }

  callToken(ticket_id: number) {
    const data = { ticket_id };
    return this.http.post<ResponseResource>(
      `${this.baseApi}/tickets/call`,
      data
    );
  }

  serveToken(ticket_id: number) {
    const data = { ticket_id };
    return this.http.post<ResponseResource>(
      `${this.baseApi}/tickets/serving`,
      data
    );
  }

  completeToken(ticket_id: number) {
    const data = { ticket_id };
    return this.http.post<ResponseResource>(
      `${this.baseApi}/tickets/complete`,
      data
    );
  }

  stopToken(ticket_id: number) {
    const data = { ticket_id };
    return this.http.post<ResponseResource>(
      `${this.baseApi}/tickets/stop`,
      data
    );
  }

  backToQueueToken(ticket_id: number) {
    const data = { ticket_id };
    return this.http.post<ResponseResource>(
      `${this.baseApi}/tickets/backToQueue`,
      data
    );
  }

  constructor(private http: HttpClient) {}
}
