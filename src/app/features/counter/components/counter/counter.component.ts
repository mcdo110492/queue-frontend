import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { Store } from "@ngrx/store";
import * as fromCounterReducer from "./../../store/reducers/counter.reducer";
import * as fromCounterActions from "./../../store/actions/counter.actions";
import * as fromCounterSelectors from "./../../store/selectors/counter.select";

import { CounterModel } from "./../../models/counter.model";
import { Observable } from "rxjs";

import { TableColumn } from "@shared/models/table.model";
import { CounterFormComponent } from "../counter-form/counter-form.component";

@Component({
  selector: "csab-counter",
  templateUrl: "./counter.component.html",
  styleUrls: ["./counter.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent implements OnInit {
  datas$: Observable<CounterModel[]>;
  displayedColumns: string[] = ["counter_name", "position", "update"];
  columns: TableColumn[] = [
    { name: "counter_name", label: "Name", isBtn: false },
    { name: "position", label: "Position", isBtn: false },
    {
      name: "update",
      label: "Update",
      isBtn: true,
      btnColor: "accent",
      btnRefId: "id"
    }
  ];
  searchTerms: string;
  isLoading$: Observable<boolean>;

  ngOnInit() {}

  onkeyup(ev: string) {
    this.searchTerms = ev;
  }

  create() {
    this.openFormDialog();
  }

  update(id: string | number) {
    this.store.dispatch(new fromCounterActions.SelectCounterModel(id));

    this.openFormDialog();
  }

  openFormDialog() {
    const dialogRef = this.dialog.open(CounterFormComponent, {
      width: "auto",
      id: "counter-form-dialog"
    });

    dialogRef.afterClosed().subscribe(() => {
      this.store.dispatch(new fromCounterActions.SelectCounterModel(null));
    });
  }

  constructor(
    private store: Store<fromCounterReducer.State>,
    private dialog: MatDialog
  ) {
    this.store.dispatch(new fromCounterActions.LoadCounters());
    this.datas$ = this.store.select(fromCounterSelectors.selectAllCounter);
    this.isLoading$ = this.store.select(
      fromCounterSelectors.selectCounterIsLoading
    );
  }
}
