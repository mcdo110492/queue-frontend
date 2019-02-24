import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "@env/environment";

import { Observable } from "rxjs";

import {
  CounterModel,
  CounterReponseGetModel,
  CounterResponseCreateUpdateModel
} from "@features/counter/models";

@Injectable()
export class CounterService {
  private baseApi: string = environment.baseApi;

  getCounters(): Observable<CounterReponseGetModel> {
    return this.http.get<CounterReponseGetModel>(`${this.baseApi}/counters`);
  }

  create(model: CounterModel): Observable<CounterResponseCreateUpdateModel> {
    return this.http.post<CounterResponseCreateUpdateModel>(
      `${this.baseApi}/counters`,
      model
    );
  }

  update(model: CounterModel): Observable<CounterResponseCreateUpdateModel> {
    return this.http.put<CounterResponseCreateUpdateModel>(
      `${this.baseApi}/counters/${model.id}`,
      model
    );
  }

  constructor(private http: HttpClient) {}
}
