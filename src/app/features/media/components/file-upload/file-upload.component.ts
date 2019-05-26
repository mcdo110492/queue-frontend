import { Component, ViewChild } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

import { UploadService } from "@features/media/services/upload/upload.service";
import { forkJoin } from "rxjs";

@Component({
  selector: "csab-file-upload",
  templateUrl: "./file-upload.component.html",
  styleUrls: ["./file-upload.component.scss"]
})
export class FileUploadComponent {
  @ViewChild("file") file;
  files: Set<File> = new Set();
  progress;
  arrFiles: { name: string }[] = [];
  canBeClosed: boolean = true;
  primaryButtonText: string = "Upload";
  showCancelButton: boolean = true;
  uploading: boolean = false;
  uploadSuccessfull: boolean = false;

  addFiles() {
    this.file.nativeElement.click();
  }

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
      }
    }
  }

  closeDialog() {
    if (this.uploadSuccessfull) {
      return this.dialogRef.close();
    }

    this.uploading = true;
    this.progress = this.uploadService.upload(this.files);

    let allProgressObservables = [];

    for (let key in this.progress) {
      allProgressObservables.push(this.progress[key].progress);
    }

    this.primaryButtonText = "Finnish";

    this.canBeClosed = false;
    this.dialogRef.disableClose = true;

    this.showCancelButton = false;

    forkJoin(allProgressObservables).subscribe(end => {
      this.canBeClosed = true;
      this.dialogRef.disableClose = false;
      this.uploadSuccessfull = true;
      this.uploading = false;
    });
  }

  constructor(
    private dialogRef: MatDialogRef<FileUploadComponent>,
    private uploadService: UploadService
  ) {}
}
