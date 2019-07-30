export interface IssueTokenModel {
  id: number;
  ticket_number: number | string;
  priority: number;
  priority_type: string;
  people_in_waiting: number;
  estimated_waiting_time: string;
  date_issued: Date | string;
  created_at?: Date | string;
}
