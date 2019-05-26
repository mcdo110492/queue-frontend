import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { MatDialog } from "@angular/material/dialog";

import { Observable } from "rxjs";

import { CounterFacadeService } from "@features/counter/facades/counter-facade.service";

import { CounterModel } from "@features/counter/models/counter.model";
import { CustomMatTableModel } from "@shared/components/custom-mat-table/models/custom-mat-table.model";

import { CounterFormComponent } from "@features/counter/components/counter-form/counter-form.component";

@Component({
  selector: "csab-counter",
  templateUrl: "./counter.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent implements OnInit {
  datas$: Observable<CounterModel[]>;
  displayedColumns: string[] = ["department", "position", "update"];
  columns: CustomMatTableModel[] = [
    {
      name: "department",
      label: "Department",
      isBtn: false,
      cell: (elem: CounterModel) => `${elem.department.name}`
    },
    {
      name: "position",
      label: "Position",
      isBtn: false,
      cell: (elem: CounterModel) => `${elem.position}`
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

  ngOnInit() {
    this.facade.loadCounters();
  }

  onkeyup(ev: string) {
    this.searchTerms = ev;
  }

  create() {
    this.openFormDialog();
  }

  update(id: string | number) {
    this.facade.selectCounter(id);
    this.openFormDialog();
  }

  openFormDialog() {
    const dialogRef = this.dialog.open(CounterFormComponent, {
      width: "auto",
      id: "counter-form-dialog"
    });

    dialogRef.afterClosed().subscribe(() => {
      this.facade.selectCounter(0);
    });
  }

  constructor(private facade: CounterFacadeService, private dialog: MatDialog) {
    this.datas$ = this.facade.entities$;
    this.isLoading$ = this.facade.isLoading$;
  }
}
