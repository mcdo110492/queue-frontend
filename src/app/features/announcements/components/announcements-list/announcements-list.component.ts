import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { MatDialog } from "@angular/material/dialog";

import { Observable } from "rxjs";

import { AnnouncementsFacadeService } from "@features/announcements/facade/announcements-facade/announcements-facade.service";

import { AnnouncementModel } from "@features/announcements/models/announcement.model";
import { CustomMatTableModel } from "@shared/components/custom-mat-table/models/custom-mat-table.model";

import { AnnouncementsFormComponent } from "@features/announcements/components/announcements-form/announcements-form.component";

@Component({
  selector: "csab-announcements-list",
  templateUrl: "./announcements-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnnouncementsListComponent implements OnInit {
  datas$: Observable<AnnouncementModel[]>;
  displayedColumns: string[] = ["message", "weight", "visibility", "update"];
  columns: CustomMatTableModel[] = [
    {
      name: "message",
      label: "Message",
      isBtn: false,
      cell: (elem: AnnouncementModel) => `${elem.message}`
    },
    {
      name: "weight",
      label: "Weight",
      isBtn: false,
      cell: (elem: AnnouncementModel) => `${elem.weight}`
    },
    {
      name: "visibility",
      label: "Visibility (1 - visible, 0 - not visible)",
      isBtn: false,
      cell: (elem: AnnouncementModel) => `${elem.visibility}`
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
    this.facade.loadList();
  }

  onkeyup(ev: string) {
    this.searchTerms = ev;
  }

  create() {
    this.openFormDialog();
  }

  update(id: number | string) {
    this.facade.select(id);
    this.openFormDialog();
  }

  openFormDialog() {
    const dialogRef = this.dialog.open(AnnouncementsFormComponent, {
      width: "auto",
      id: "announcement-form-dialog"
    });

    dialogRef.afterClosed().subscribe(() => {
      this.facade.select(0);
    });
  }

  constructor(
    private dialog: MatDialog,
    private facade: AnnouncementsFacadeService
  ) {
    this.datas$ = this.facade.entities$;
    this.isLoading$ = this.facade.isLoading$;
  }
}
