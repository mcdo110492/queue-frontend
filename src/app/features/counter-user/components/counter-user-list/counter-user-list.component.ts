import { Component, ChangeDetectionStrategy } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { Observable } from "rxjs";

import { Store } from "@ngrx/store";
import * as fromCounterUserReducer from "@features/counter-user/state/reducers/counter-user.reducer";
import * as fromCounterUserActions from "@features/counter-user/state/actions/counter-user.actions";
import * as fromCounterUserSelectors from "@features/counter-user/state/selectors/counter-user.select";

import { CustomMatTableModel } from "@shared/components/custom-mat-table/models/custom-mat-table.model";
import { CounterUserModel } from "@features/counter-user/models";

import { CounterUserFormComponent } from "@features/counter-user/components/counter-user-form/counter-user-form.component";

@Component({
  selector: "csab-counter-user-list",
  templateUrl: "./counter-user-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterUserListComponent {
  datas$: Observable<CounterUserModel[]>;
  displayedColumns: string[] = ["counter_name", "username", "update"];
  columns: CustomMatTableModel[] = [
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
