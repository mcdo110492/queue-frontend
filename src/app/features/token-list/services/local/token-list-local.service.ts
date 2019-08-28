import { Injectable } from "@angular/core";

import { CustomMatTableModel } from "@shared/components/custom-mat-table/models/custom-mat-table.model";
import { TokenListModel } from "@features/token-list/models";

@Injectable()
export class TokenListLocalService {
  getPriority(priority: number) {
    switch (priority) {
      case 0:
        return "Regular";
        break;
      case 1:
        return "Priority";
        break;

      default:
        return "Regular";
        break;
    }
  }

  getStatus(status: number) {
    switch (status) {
      case 0:
        return "Pending";
        break;
      case 3:
        return "Done"; // Completed
        break;
      case 4:
        return "Stopped";
        break;

      default:
        return "Pending";
        break;
    }
  }

  status: any = [
    { id: 0, name: "Pending" },
    { id: 3, name: "Done"  }, //Completed
    { id: 4, name: "Stopped" }
  ];

  columns: CustomMatTableModel[] = [
    {
      name: "ticket_number",
      label: "Ticket Number",
      isBtn: false,
      cell: (elem: TokenListModel) => `${elem.ticket_number}`
    },
    {
      name: "priority",
      label: "Priority",
      isBtn: false,
      cell: (elem: TokenListModel) => this.getPriority(elem.priority)
    },
    {
      name: "status",
      label: "Status",
      isBtn: false,
      cell: (elem: TokenListModel) => this.getStatus(elem.status)
    },
    {
      name: "date_issued",
      label: "Date Issued",
      isBtn: false,
      cell: (elem: TokenListModel) => `${elem.created_at}`
    },
    {
      name: "date_completed",
      label: "Date Completed",
      isBtn: false,
      cell: (elem: TokenListModel) =>
        elem.latest_user ? `${elem.latest_user.created_at}` : ""
    },
    {
      name: "served_time",
      label: "Served Time",
      isBtn: false,
      cell: (elem: TokenListModel) =>
        elem.latest_user ? `${elem.latest_user.served_time}` : ""
    },
    {
      name: "department",
      label: "Department",
      isBtn: false,
      cell: (elem: TokenListModel) =>
        elem.department ? `${elem.department.name}` : ""
    },
    {
      name: "counter",
      label: "Counter",
      isBtn: false,
      cell: (elem: TokenListModel) =>
        elem.department ? `${elem.department.counter.position}` : ""
    },
    {
      name: "user",
      label: "User",
      isBtn: false,
      cell: (elem: TokenListModel) =>
        elem.latest_user ? `${elem.latest_user.user.username}` : ""
    }
  ];
}
