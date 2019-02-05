import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@env/environment";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

interface UniqueStatusResponseModel {
  isUnique: boolean;
}

@Injectable({
  providedIn: "root"
})
export class UniqueValidatorService {
  private baseApi: string = environment.baseApi;

  validateUnique(
    url: string,
    field: string,
    value: any,
    id: number
  ): Observable<boolean> {
    const data = { field, value, id };
    return this.http
      .post<UniqueStatusResponseModel>(`${this.baseApi}/api/${url}`, data)
      .pipe(
        map(response => (response.isUnique ? true : false)),
        catchError(() => of(false))
      );
  }

  constructor(private http: HttpClient) {}
}
