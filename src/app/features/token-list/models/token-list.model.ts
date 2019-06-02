export interface TokenListModel {
  id: number;
  ticket_number: number;
  priority: number;
  status: number;
  date_issued: Date | string;
  department_id: number;
  department?: {
    id: number;
    code: string;
    name: string;
  };
  latest_user?: {
    id: number;
    ticket_id: number;
    user_id: number;
    status: number;
    served_time: Date | string;
    complete_time: Date | string;
    created_at: Date | string;
    user?: {
      id: number;
      username: string;
      name: string;
    };
  };
  created_at: Date | string;
}
