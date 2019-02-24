import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "@env/environment";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import {
  CounterUserModel,
  CounterUserReponseGetModel,
  CounterUserResponseCreateUpdateModel
} from "@features/counter-user/models";
import { CounterModel, CounterReponseGetModel } from "@features/counter/models";
import { UserStateModel } from "@core/models";

@Injectable()
export class CounterUserApiService {
  private baseApi: string = environment.baseApi;

  getCounters(): Observable<CounterUserReponseGetModel> {
    return this.http.get<CounterUserReponseGetModel>(
      `${this.baseApi}/counters/users`
    );
  }

  create(
    model: CounterUserModel
  ): Observable<CounterUserResponseCreateUpdateModel> {
    return this.http.post<CounterUserResponseCreateUpdateModel>(
      `${this.baseApi}/counters/users`,
      model
    );
  }

  update(
    model: CounterUserModel
  ): Observable<CounterUserResponseCreateUpdateModel> {
    return this.http.put<CounterUserResponseCreateUpdateModel>(
      `${this.baseApi}/counters/users/${model.id}`,
      model
    );
  }

  loadCounters(): Observable<CounterModel[]> {
    return this.http
      .get<CounterReponseGetModel>(`${this.baseApi}/counters`)
      .pipe(map(response => response.payload.data));
  }

  loadUsers(): Observable<UserStateModel[]> {
    return this.http
      .get<{ payload: { data: UserStateModel[] } }>(`${this.baseApi}/users`)
      .pipe(map(response => response.payload.data));
  }

  constructor(private http: HttpClient) {}
}
