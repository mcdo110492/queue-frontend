import { Component, ChangeDetectionStrategy } from "@angular/core";

import { MatDialog } from "@angular/material/dialog";

import { FileUploadComponent } from "./../file-upload/file-upload.component";

@Component({
  selector: "csab-media-container",
  templateUrl: "./media-container.component.html",
  styleUrls: ["./media-container.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaContainerComponent {
  openUploadDialog() {
    let dialogRef = this.dialog.open(FileUploadComponent, {
      width: "800px",
      height: "auto",
      id: "file-upload-dialog"
    });
  }

  constructor(private dialog: MatDialog) {}
}
