export interface TokenModel {
  id: number;
  ticket_number: number;
  priority: number;
  priority_type: string;
  status: number;
  latest_user: {
    id: number;
    status: number;
    user_counter: {
      id: number;
      counter: {
        id: number;
        position: number;
        department: {
          id: number;
          name: string;
          code: string;
        };
      };
    };
  };
}
