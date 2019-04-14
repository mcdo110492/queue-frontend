export interface TokenModel {
  id: number;
  ticket_number: number;
  priority: number;
  counter: {
    id: number;
    counter_name: string;
  };
}
