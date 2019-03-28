import { Component, ChangeDetectionStrategy } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { Observable } from "rxjs";

import { CounterUserFacadeService } from "@features/counter-user/facades/counter-user-facade.service";

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

  update(id: number) {
    this.facade.select(id);
    this.openFormDialog();
  }

  openFormDialog() {
    const dialogRef = this.dialog.open(CounterUserFormComponent, {
      width: "auto",
      id: "counter-user-form-dialog"
    });

    dialogRef.afterClosed().subscribe(() => {
      this.facade.select(0);
    });
  }

  constructor(
    private facade: CounterUserFacadeService,
    private dialog: MatDialog
  ) {
    this.facade.loadCountersUser();

    this.datas$ = this.facade.entities$;

    this.isLoading$ = this.facade.isLoading$;
  }
}
