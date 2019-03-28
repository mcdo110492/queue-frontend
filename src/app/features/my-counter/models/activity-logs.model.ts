import { TokenModel } from "./token.model";

export interface ActivityLogModel {
  id: number;
  ticket_id: number;
  user_id: number;
  status: number;
  ticket: TokenModel;
  complete_time: Date | string;
}
