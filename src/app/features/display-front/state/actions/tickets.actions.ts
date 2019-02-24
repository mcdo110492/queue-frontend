import { Action } from "@ngrx/store";
import { Update } from "@ngrx/entity";
import { TicketModel } from "@features/display-front/models/ticket.model";

export enum TicketsActionTypes {
  LoadTicketss = "[Tickets] Load Ticketss",
  AddTickets = "[Tickets] Add Tickets",
  UpsertTickets = "[Tickets] Upsert Tickets",
  AddTicketss = "[Tickets] Add Ticketss",
  UpsertTicketss = "[Tickets] Upsert Ticketss",
  UpdateTickets = "[Tickets] Update Tickets",
  UpdateTicketss = "[Tickets] Update Ticketss",
  DeleteTickets = "[Tickets] Delete Tickets",
  DeleteTicketss = "[Tickets] Delete Ticketss",
  ClearTicketss = "[Tickets] Clear Ticketss"
}

export class LoadTicketss implements Action {
  readonly type = TicketsActionTypes.LoadTicketss;

  constructor(public payload: { ticketss: TicketModel[] }) {}
}

export class AddTickets implements Action {
  readonly type = TicketsActionTypes.AddTickets;

  constructor(public payload: { tickets: TicketModel }) {}
}

export class UpsertTickets implements Action {
  readonly type = TicketsActionTypes.UpsertTickets;

  constructor(public payload: { tickets: TicketModel }) {}
}

export class AddTicketss implements Action {
  readonly type = TicketsActionTypes.AddTicketss;

  constructor(public payload: { ticketss: TicketModel[] }) {}
}

export class UpsertTicketss implements Action {
  readonly type = TicketsActionTypes.UpsertTicketss;

  constructor(public payload: { ticketss: TicketModel[] }) {}
}

export class UpdateTickets implements Action {
  readonly type = TicketsActionTypes.UpdateTickets;

  constructor(public payload: { tickets: Update<TicketModel> }) {}
}

export class UpdateTicketss implements Action {
  readonly type = TicketsActionTypes.UpdateTicketss;

  constructor(public payload: { ticketss: Update<TicketModel>[] }) {}
}

export class DeleteTickets implements Action {
  readonly type = TicketsActionTypes.DeleteTickets;

  constructor(public payload: { id: string }) {}
}

export class DeleteTicketss implements Action {
  readonly type = TicketsActionTypes.DeleteTicketss;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearTicketss implements Action {
  readonly type = TicketsActionTypes.ClearTicketss;
}

export type TicketsActions =
  | LoadTicketss
  | AddTickets
  | UpsertTickets
  | AddTicketss
  | UpsertTicketss
  | UpdateTickets
  | UpdateTicketss
  | DeleteTickets
  | DeleteTicketss
  | ClearTicketss;
