import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

import { environment } from "@env/environment";
import { TokenListGetResponseModel } from "@features/token-list/models";

@Injectable()
export class TokenListService {
  private baseApi: string = environment.baseApi;

  getList(status: number): Observable<TokenListGetResponseModel> {
    return this.http.get<TokenListGetResponseModel>(
      `${this.baseApi}/tickets/list/${status}`
    );
  }

  constructor(private http: HttpClient) {}
}
