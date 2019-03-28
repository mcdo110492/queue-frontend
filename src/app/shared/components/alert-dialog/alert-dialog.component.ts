import { Component, ChangeDetectionStrategy, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface DialogData {
  title: string;
  content: string;
}

@Component({
  selector: "csab-alert-dialog",
  templateUrl: "./alert-dialog.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick() {
    this.dialogRef.close();
  }
}
