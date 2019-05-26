import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "@env/environment";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import {
  CounterModel,
  CounterReponseGetModel,
  CounterResponseCreateUpdateModel
} from "@features/counter/models";
import { DepartmentModel } from "@features/counter/models/department.model";

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

  loadDepartments(): Observable<DepartmentModel[]> {
    return this.http
      .get<{ payload: { count: number; data: DepartmentModel[] } }>(
        `${this.baseApi}/departments`
      )
      .pipe(map(response => response.payload.data));
  }

  constructor(private http: HttpClient) {}
}
