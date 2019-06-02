import { Component, Inject, ChangeDetectionStrategy } from "@angular/core";

import { MAT_DIALOG_DATA } from "@angular/material";

import { MediaModel } from "@features/media/models/media.model";

import { environment } from "@env/environment";

@Component({
  selector: "csab-media-view-modal",
  templateUrl: "./media-view-modal.component.html",
  styleUrls: ["./media-view-modal.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaViewModalComponent {
  ftpServer: string = environment.ftp;
  constructor(@Inject(MAT_DIALOG_DATA) public data: MediaModel) {}
}
