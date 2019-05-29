import {
  Component,
  OnInit,
  Inject,
  ChangeDetectionStrategy
} from "@angular/core";

import { MAT_DIALOG_DATA } from "@angular/material";

import { MediaPlayerModel } from "@shared/components/media-player/models/media-player.model";
import { MediaModel } from "@features/media/models/media.model";

@Component({
  selector: "csab-media-view-modal",
  templateUrl: "./media-view-modal.component.html",
  styleUrls: ["./media-view-modal.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaViewModalComponent implements OnInit {
  sources: MediaPlayerModel[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: MediaModel) {}

  ngOnInit() {
    this.sources = [
      {
        id: this.data.id,
        media_type: this.data.media_type,
        source: this.data.source
      }
    ];
  }
}
