export interface TicketModel {
  id: number;
  ticket_number: number;
  priority: number;
  counter: {
    id: number;
    counter_name: string;
  };
}
