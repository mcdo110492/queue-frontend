import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@env/environment";
import { Observable } from "rxjs";
import { CounterModel } from "../models/counter.model";

interface CounterReponseModel {
  payload: { count: number; data: CounterModel[] };
}

@Injectable()
export class CounterService {
  private baseApi: string = environment.baseApi;

  getCounters(): Observable<CounterReponseModel> {
    return this.http.get<CounterReponseModel>(`${this.baseApi}/api/counters`);
  }
  constructor(private http: HttpClient) {}
}
