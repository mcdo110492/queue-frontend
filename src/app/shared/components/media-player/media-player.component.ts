import { Component, ChangeDetectionStrategy, Input } from "@angular/core";

import { VgAPI } from "videogular2/core";

import { MediaPlayerModel } from "./models/media-player.model";

@Component({
  selector: "csab-media-player",
  templateUrl: "./media-player.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaPlayerComponent {
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

  nextVideo() {
    this.currentIndex++;

    if (this.currentIndex == this.sources.length) {
      this.currentIndex = 0;
    }

    this.currentItem = this.sources[this.currentIndex];
    this.api.play();
  }
}
