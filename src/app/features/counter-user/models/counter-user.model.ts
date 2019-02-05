import { CounterModel } from "@features/counter/models/counter.model";
import { UserModel } from "@user-store/models/user.model";

export interface CounterUserModel {
  id: number;
  counter_id: number;
  user_id: number;
  counter?: CounterModel;
  user?: UserModel;
}
