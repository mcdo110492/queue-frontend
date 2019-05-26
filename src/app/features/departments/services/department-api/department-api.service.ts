import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "@env/environment";
import { Observable } from "rxjs";
import {
  DepartmentGetResponseModel,
  DepartmentCreateResponsesModel,
  DepartmentModel
} from "@features/departments/models";

@Injectable()
export class DepartmentApiService {
  private baseApi: string = environment.baseApi;

  getDepartments(): Observable<DepartmentGetResponseModel> {
    return this.http.get<DepartmentGetResponseModel>(
      `${this.baseApi}/departments`
    );
  }

  create(model: DepartmentModel): Observable<DepartmentCreateResponsesModel> {
    return this.http.post<DepartmentCreateResponsesModel>(
      `${this.baseApi}/departments`,
      model
    );
  }

  update(model: DepartmentModel): Observable<DepartmentCreateResponsesModel> {
    return this.http.put<DepartmentCreateResponsesModel>(
      `${this.baseApi}/departments/${model.id}`,
      model
    );
  }

  constructor(private http: HttpClient) {}
}
