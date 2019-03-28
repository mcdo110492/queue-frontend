import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AlertDialogComponent } from "./../../components/alert-dialog/alert-dialog.component";

@Injectable({
  providedIn: "root"
})
export class AlertDialogService {
  open(data: { title: string; content: string }) {
    return this.dialog.open(AlertDialogComponent, {
      data,
      width: "auto",
      height: "auto"
    });
  }
  constructor(private dialog: MatDialog) {}
}
