import { CustomMatTableModel } from "@shared/components/custom-mat-table/models/custom-mat-table.model";
import { ActivityLogModel } from "@features/my-counter/models";

export const TABLE_COLUMNS: CustomMatTableModel[] = [
  {
    name: "ticket_number",
    label: "Ticket Number",
    isBtn: false,
    cell: (elem: ActivityLogModel) => `${elem.ticket.ticket_number}`
  },
  {
    name: "priority",
    label: "Priority",
    isBtn: false,
    cell: (elem: ActivityLogModel) =>
      getTokenPriorityLabel(elem.ticket.priority)
  },
  {
    name: "status",
    label: "Status",
    isBtn: false,
    cell: (elem: ActivityLogModel) => `${getTokenStatusLabel(elem.status)}`
  },
  {
    name: "complete_time",
    label: "Complete Time",
    isBtn: false,
    cell: (elem: ActivityLogModel) => elem.complete_time
  }
];

export function getTokenPriorityLabel(priority: number) {
  switch (priority) {
    case 1:
      return "Priority";
      break;
    default:
      return "Normal";
      break;
  }
}

export function getTokenStatusLabel(status: number) {
  switch (status) {
    case 0:
      return "Pending";
      break;
    case 1:
      return "Called";
      break;
    case 2:
      return "Served";
      break;
    case 3:
      return "Completed";
      break;
    case 4:
      return "Stopped";
      break;
    default:
      return "Pending";
      break;
  }
}
