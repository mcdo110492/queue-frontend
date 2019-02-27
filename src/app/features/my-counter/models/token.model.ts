export interface TokenModel {
  id: number;
  ticket_number: number;
  priority: number;
  status: number;
  date_issued: Date | string;
}
