import { CounterModel } from "./counter.model";

export interface CounterResponseCreateUpdateModel {
  payload: { data: CounterModel };
}

export interface CounterReponseGetModel {
  payload: { count: number; data: CounterModel[] };
}
