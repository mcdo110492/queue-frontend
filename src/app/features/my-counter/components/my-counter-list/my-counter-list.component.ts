import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";

import { Observable, of } from "rxjs";

import { ActivityLogModel } from "@features/my-counter/models";
import { CustomMatTableModel } from "@shared/components/custom-mat-table/models/custom-mat-table.model";

import { TABLE_COLUMNS } from "./my-counter-list.column";

@Component({
  selector: "csab-my-counter-list",
  templateUrl: "./my-counter-list.component.html",
  styleUrls: ["./my-counter-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyCounterListComponent implements OnInit {
  datas$: Observable<ActivityLogModel[]>;
  displayedColumns: string[] = [
    "ticket_number",
    "priority",
    "status",
    "complete_time"
  ];
  columns: CustomMatTableModel[] = TABLE_COLUMNS;
  isLoading$: Observable<boolean>;
  searchTerms: string;

  ngOnInit() {}

  constructor() {
    this.datas$ = of([]);
  }
}
