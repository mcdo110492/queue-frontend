import { Component, ChangeDetectionStrategy, Input } from "@angular/core";

import { VgAPI } from "videogular2/core";

import { MediaPlayerModel } from "./models/media-player.model";
import { environment } from "@env/environment";

@Component({
  selector: "csab-media-player",
  templateUrl: "./media-player.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaPlayerComponent {
  private ftpLink: string = environment.ftp;
  @Input() sources: MediaPlayerModel[];
  api: VgAPI;
  currentIndex: number = 0;
  currentItem: MediaPlayerModel;

  onPlayerReady(api: VgAPI) {
    this.currentItem = this.sources[this.currentIndex];
    this.api = api;
    this.api
      .getDefaultMedia()
      .subscriptions.loadedMetadata.subscribe(this.playVideo.bind(this));
    this.api
      .getDefaultMedia()
      .subscriptions.ended.subscribe(this.nextVideo.bind(this));
  }

  playVideo() {
    this.api.play();
  }

  getSourcesLink(src: string) {
    return `${this.ftpLink}${src}`;
  }

  nextVideo() {
    this.currentIndex++;

    if (this.currentIndex == this.sources.length) {
      this.currentIndex = 0;
    }

    this.currentItem = this.sources[this.currentIndex];
    this.api.play();
  }
}
