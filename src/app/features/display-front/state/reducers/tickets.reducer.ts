import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { TicketModel } from "@features/display-front/models/ticket.model";
import { TicketsActions, TicketsActionTypes } from "../actions/tickets.actions";

export interface State extends EntityState<TicketModel> {
  // additional entities state properties
}

export const adapter: EntityAdapter<TicketModel> = createEntityAdapter<
  TicketModel
>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(state = initialState, action: TicketsActions): State {
  switch (action.type) {
    case TicketsActionTypes.AddTickets: {
      return adapter.addOne(action.payload.tickets, state);
    }

    case TicketsActionTypes.UpsertTickets: {
      return adapter.upsertOne(action.payload.tickets, state);
    }

    case TicketsActionTypes.AddTicketss: {
      return adapter.addMany(action.payload.ticketss, state);
    }

    case TicketsActionTypes.UpsertTicketss: {
      return adapter.upsertMany(action.payload.ticketss, state);
    }

    case TicketsActionTypes.UpdateTickets: {
      return adapter.updateOne(action.payload.tickets, state);
    }

    case TicketsActionTypes.UpdateTicketss: {
      return adapter.updateMany(action.payload.ticketss, state);
    }

    case TicketsActionTypes.DeleteTickets: {
      return adapter.removeOne(action.payload.id, state);
    }

    case TicketsActionTypes.DeleteTicketss: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case TicketsActionTypes.LoadTicketss: {
      return adapter.addAll(action.payload.ticketss, state);
    }

    case TicketsActionTypes.ClearTicketss: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();
