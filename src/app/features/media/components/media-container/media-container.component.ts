import { Component, ChangeDetectionStrategy } from "@angular/core";

import { MatDialog } from "@angular/material/dialog";

import { FileUploadComponent } from "./../file-upload/file-upload.component";
import { MediaFacadeService } from "@features/media/facades/media-facade.service";

@Component({
  selector: "csab-media-container",
  templateUrl: "./media-container.component.html",
  styleUrls: ["./media-container.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaContainerComponent {
  openUploadDialog() {
    const dialog = this.dialog.open(FileUploadComponent, {
      width: "800px",
      height: "auto",
      id: "file-upload-dialog"
    });

    dialog.afterClosed().subscribe(() => {
      this.facade.loadMedias();
    });
  }

  constructor(private dialog: MatDialog, private facade: MediaFacadeService) {}
}
