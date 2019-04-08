import { Injectable } from "@angular/core";

import { MatDialog } from "@angular/material";

import { DialogLoaderComponent } from "@shared/components/dialog-loader/dialog-loader.component";

@Injectable()
export class DialogLoaderService {
  openLoader() {
    this.dialog.open(DialogLoaderComponent, {
      width: "auto",
      height: "auto",
      id: "csab-dialog-loader"
    });
  }

  closeLoader() {
    this.dialog.getDialogById("csab-dialog-loader").close();
  }

  constructor(private dialog: MatDialog) {}
}
