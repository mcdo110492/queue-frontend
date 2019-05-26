import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "@env/environment";

import {
  UserManagementCreateUpdateModel,
  UserManagementGetModel,
  UserManagementModel,
  DepartmentModel
} from "./../../models";

@Injectable()
export class UserManagementApiService {
  private baseApi: string = environment.baseApi;
  getUsers(): Observable<UserManagementGetModel> {
    return this.http.get<UserManagementGetModel>(`${this.baseApi}/users`);
  }

  create(
    model: UserManagementModel
  ): Observable<UserManagementCreateUpdateModel> {
    return this.http.post<UserManagementCreateUpdateModel>(
      `${this.baseApi}/users`,
      model
    );
  }

  update(
    model: UserManagementModel
  ): Observable<UserManagementCreateUpdateModel> {
    return this.http.put<UserManagementCreateUpdateModel>(
      `${this.baseApi}/users/${model.id}`,
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
