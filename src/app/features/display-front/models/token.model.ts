export interface TokenModel {
  id: number;
  ticket_number: number;
  priority: number;
  status: number;
  latest_user: {
    id: number;
    status: number;
    user_counter: {
      id: number;
      counter: {
        counter_name: string;
      };
    };
  };
}
