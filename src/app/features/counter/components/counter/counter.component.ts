import { Component, OnInit } from "@angular/core";

import { Store } from "@ngrx/store";
import * as fromCounterReducer from "./../../store/reducers/counter.reducer";
import * as fromCounterActions from "./../../store/actions/counter.actions";
import * as fromCounterSelectors from "./../../store/selectors/counter.select";

import { CounterModel } from "./../../models/counter.model";
import { Observable } from "rxjs";

import { TableColumn } from "@shared/models/table.model";

@Component({
  selector: "csab-counter",
  templateUrl: "./counter.component.html",
  styleUrls: ["./counter.component.scss"]
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

  update(ev: string | number) {
    console.log(ev);
  }

  constructor(private store: Store<fromCounterReducer.State>) {
    this.store.dispatch(new fromCounterActions.LoadCounters());
    this.datas$ = this.store.select(fromCounterSelectors.selectAllCounter);
    this.isLoading$ = this.store.select(
      fromCounterSelectors.selectCounterIsLoading
    );
  }
}
