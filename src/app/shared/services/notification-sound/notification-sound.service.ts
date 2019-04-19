import { Injectable } from "@angular/core";

import { Howl, Howler } from "howler";

@Injectable()
export class NotificationSoundService {
  playChimes() {
    const sound = new Howl({
      src: ["assets/chimes.mp3"]
    });
    sound.play();
  }

  playBell() {
    const sound = new Howl({
      src: ["assets/door-bell.wav"]
    });

    sound.play();
  }
}
