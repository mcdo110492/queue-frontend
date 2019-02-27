import { TokenModel } from "./token.model";

export interface ActivityLogModel {
  id: number;
  ticket_number: number;
  user_id: number;
  status: number;
  complete_time: Date | string;
  ticket: TokenModel[];
}
