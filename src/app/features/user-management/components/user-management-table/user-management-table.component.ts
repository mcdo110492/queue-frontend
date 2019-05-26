import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { MatDialog } from "@angular/material/dialog";

import { Observable } from "rxjs";

import { UserManagementFacadeService } from "@features/user-management/facades/user-management-facade.service";

import { UserManagementModel } from "@features/user-management/models/user-management.model";
import { CustomMatTableModel } from "@shared/components/custom-mat-table/models/custom-mat-table.model";

import { UserManagementFormComponent } from "@features/user-management/components/user-management-form/user-management-form.component";

@Component({
  selector: "csab-user-management-table",
  templateUrl: "./user-management-table.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserManagementTableComponent implements OnInit {
  datas$: Observable<UserManagementModel[]>;
  displayedColumns: string[] = [
    "username",
    "name",
    "role",
    "status",
    "department",
    "update"
  ];
  columns: CustomMatTableModel[] = [
    {
      name: "username",
      label: "Username",
      isBtn: false,
      cell: (elem: UserManagementModel) => `${elem.username}`
    },
    {
      name: "name",
      label: "Name",
      isBtn: false,
      cell: (elem: UserManagementModel) => `${elem.name}`
    },
    {
      name: "role",
      label: "Role",
      isBtn: false,
      cell: (elem: UserManagementModel) => this.facade.getRole(elem.role)
    },
    {
      name: "status",
      label: "Status",
      isBtn: false,
      cell: (elem: UserManagementModel) => this.facade.getStatus(elem.status)
    },
    {
      name: "department",
      label: "Department",
      isBtn: false,
      cell: (elem: UserManagementModel) => `${elem.department.name}`
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
    this.facade.loadUsers();
  }

  onkeyup(ev: string) {
    this.searchTerms = ev;
  }

  create() {
    this.openFormDialog();
  }

  update(id: string | number) {
    this.facade.selectUser(id);
    this.openFormDialog();
  }

  openFormDialog() {
    const dialogRef = this.dialog.open(UserManagementFormComponent, {
      width: "auto",
      id: "user-form-dialog"
    });

    dialogRef.afterClosed().subscribe(() => {
      this.facade.selectUser(0);
    });
  }

  constructor(
    private facade: UserManagementFacadeService,
    private dialog: MatDialog
  ) {
    this.datas$ = this.facade.entities$;
    this.isLoading$ = this.facade.isLoading$;
  }
}
