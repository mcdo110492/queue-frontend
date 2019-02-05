import { CounterUserModel } from "./counter-user.model";

export interface CounterUserResponseCreateUpdateModel {
  payload: { data: CounterUserModel };
}

export interface CounterUserReponseGetModel {
  payload: { count: number; data: CounterUserModel[] };
}
