import { CounterModel } from "@features/counter/models/counter.model";
import { UserStateModel } from "@core/models";

export interface CounterUserModel {
  id: number;
  counter_id: number;
  user_id: number;
  counter?: CounterModel;
  user?: UserStateModel;
}
