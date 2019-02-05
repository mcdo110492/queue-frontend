import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import * as fromCounterUserReducer from "./../../store/reducers/counter-user.reducer";
import * as fromCounterUserActions from "./../../store/actions/counter-user.actions";
import * as fromCounterUserSelectors from "./../../store/selectors/counter-user.select";

import { TableColumn } from "@shared/models/table.model";

import { CounterUserModel } from "./../../models";
import { CounterUserFormComponent } from "./../counter-user-form/counter-user-form.component";

@Component({
  selector: "csab-counter-user-list",
  templateUrl: "./counter-user-list.component.html",
  styleUrls: ["./counter-user-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterUserListComponent {
  datas$: Observable<CounterUserModel[]>;
  displayedColumns: string[] = ["counter_name", "username", "update"];
  columns: TableColumn[] = [
    {
      name: "counter_name",
      label: "Counter",
      isBtn: false,
      cell: (elem: any) => `${elem.counter.counter_name}`
    },
    {
      name: "username",
      label: "User (username)",
      isBtn: false,
      cell: (elem: any) => `${elem.user.username}`
    },
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

  onkeyup(ev: string) {
    this.searchTerms = ev;
  }

  create() {
    this.openFormDialog();
  }

  update(id: string | number) {
    this.store.dispatch(new fromCounterUserActions.SelectCounterUserModel(id));

    this.openFormDialog();
  }

  openFormDialog() {
    const dialogRef = this.dialog.open(CounterUserFormComponent, {
      width: "auto",
      id: "counter-user-form-dialog"
    });

    dialogRef.afterClosed().subscribe(() => {
      this.store.dispatch(
        new fromCounterUserActions.SelectCounterUserModel(null)
      );
    });
  }

  constructor(
    private store: Store<fromCounterUserReducer.State>,
    private dialog: MatDialog
  ) {
    this.store.dispatch(new fromCounterUserActions.LoadCounterUsers());

    this.datas$ = this.store.select(
      fromCounterUserSelectors.selectAllCounterUser
    );
    this.isLoading$ = this.store.select(
      fromCounterUserSelectors.selectCounterUserIsLoading
    );
  }
}
