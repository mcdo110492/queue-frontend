import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "@env/environment";

import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UniqueValidatorService {
  backendValidate(
    url: string,
    field: string,
    value: any,
    id: number | string
  ): Observable<boolean> {
    const data = { field, value, id };
    return this.http
      .post<{ isUnique: boolean }>(`${environment.baseApi}/${url}`, data)
      .pipe(
        map(response => (response.isUnique ? true : false)),
        catchError(() => of(false))
      );
  }

  constructor(private http: HttpClient) {}
}
