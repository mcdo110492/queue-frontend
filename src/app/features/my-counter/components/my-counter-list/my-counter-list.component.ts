import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { ActivityLogModel } from "@features/my-counter/models";
import { CustomMatTableModel } from "@shared/components/custom-mat-table/models/custom-mat-table.model";

import { TABLE_COLUMNS } from "./my-counter-list.column";

import * as fromActivityLogsState from "@features/my-counter/state/activity-logs/activity-logs.reducer";
import * as fromActivityLogsActions from "@features/my-counter/state/activity-logs/activity-logs.actions";
import * as fromActivityLogsSelectors from "@features/my-counter/state/activity-logs/activity-logs.selector";

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

  ngOnInit() {
    this.store.dispatch(new fromActivityLogsActions.LoadActivityLogs());
  }

  constructor(private store: Store<fromActivityLogsState.State>) {
    this.isLoading$ = this.store.select(
      fromActivityLogsSelectors.selectIsLogLoading
    );
    this.datas$ = this.store.select(
      fromActivityLogsSelectors.selectAllActivityLog
    );
  }
}
