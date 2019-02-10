import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "@env/environment";
import { Observable } from "rxjs";
import { IssueTokenModel } from "@features/issue-token/models";

interface IssueTokenDataModel {
  priority: number;
}

interface IssueTokenResponseModel {
  payload: IssueTokenModel;
}

@Injectable()
export class IssueTokenApiService {
  private baseApi: string = environment.baseApi;

  generateToken(
    data: IssueTokenDataModel
  ): Observable<IssueTokenResponseModel> {
    return this.http.post<IssueTokenResponseModel>(
      `${this.baseApi}/api/tickets/generate`,
      data
    );
  }

  constructor(private http: HttpClient) {}
}
