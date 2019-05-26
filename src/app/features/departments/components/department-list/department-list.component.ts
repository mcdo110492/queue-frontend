import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { MatDialog } from "@angular/material";

import { DeparmentsFacadeService } from "@features/departments/facades/deparments-facade.service";
import { DepartmentFormComponent } from "../department-form/department-form.component";

import { Observable } from "rxjs";

import { DepartmentModel } from "@features/departments/models";
import { CustomMatTableModel } from "@shared/components/custom-mat-table/models/custom-mat-table.model";

@Component({
  selector: "csab-department-list",
  templateUrl: "./department-list.component.html",
  styleUrls: ["./department-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepartmentListComponent implements OnInit {
  datas$: Observable<DepartmentModel[]>;
  displayedColumns: string[] = ["name", "code", "update"];
  columns: CustomMatTableModel[] = [
    {
      name: "name",
      label: "Name",
      isBtn: false,
      cell: (elem: any) => `${elem.name}`
    },
    {
      name: "code",
      label: "Code",
      isBtn: false,
      cell: (elem: any) => `${elem.code}`
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
    this.facade.loadDepartments();
  }

  onkeyup(ev: string) {
    this.searchTerms = ev;
  }

  create() {
    this.openFormDialog();
  }

  update(id: string | number) {
    this.facade.selectDepartment(id);
    this.openFormDialog();
  }

  openFormDialog() {
    const dialogRef = this.dialog.open(DepartmentFormComponent, {
      width: "auto",
      id: "department-form-dialog"
    });

    dialogRef.afterClosed().subscribe(() => {
      this.facade.selectDepartment(0);
    });
  }

  constructor(
    private dialog: MatDialog,
    private facade: DeparmentsFacadeService
  ) {
    this.datas$ = this.facade.entities$;
    this.isLoading$ = this.facade.isLoading$;
  }
}
