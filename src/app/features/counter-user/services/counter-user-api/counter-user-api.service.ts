import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@env/environment";
import { Observable } from "rxjs";

import {
  CounterUserModel,
  CounterUserReponseGetModel,
  CounterUserResponseCreateUpdateModel
} from "./../../models";
import { CounterModel, CounterReponseGetModel } from "@features/counter/models";
import { UserModel } from "@user-store/models";
import { map } from "rxjs/operators";

@Injectable()
export class CounterUserApiService {
  private baseApi: string = environment.baseApi;

  getCounters(): Observable<CounterUserReponseGetModel> {
    return this.http.get<CounterUserReponseGetModel>(
      `${this.baseApi}/api/counters/users`
    );
  }

  create(
    model: CounterUserModel
  ): Observable<CounterUserResponseCreateUpdateModel> {
    return this.http.post<CounterUserResponseCreateUpdateModel>(
      `${this.baseApi}/api/counters/users`,
      model
    );
  }

  update(
    model: CounterUserModel
  ): Observable<CounterUserResponseCreateUpdateModel> {
    return this.http.put<CounterUserResponseCreateUpdateModel>(
      `${this.baseApi}/api/counters/users/${model.id}`,
      model
    );
  }

  loadCounters(): Observable<CounterModel[]> {
    return this.http
      .get<CounterReponseGetModel>(`${this.baseApi}/api/counters`)
      .pipe(map(response => response.payload.data));
  }

  loadUsers(): Observable<UserModel[]> {
    return this.http
      .get<{ payload: { data: UserModel[] } }>(`${this.baseApi}/api/users`)
      .pipe(map(response => response.payload.data));
  }

  constructor(private http: HttpClient) {}
}
