import { Injectable } from "@angular/core";
import { Observable, interval } from "rxjs";
import { map, filter } from "rxjs/operators";

@Injectable()
export class MyCounterTimerService {
  minutes: number = 0;
  seconds: number = 0;
  start: boolean = false;
  timer$: Observable<string>;

  startTimer() {
    this.start = true;
  }

  stopTimer() {
    this.start = false;
  }

  resetTimer() {
    this.minutes = 0;
    this.seconds = 0;
  }

  constructor() {
    this.timer$ = interval(1000).pipe(
      filter(() => this.start),
      map(() => {
        this.seconds++;
        if (this.seconds > 59) {
          this.minutes = this.minutes + 1;
          this.seconds = 0;
        }
        let minutes: string = `${this.minutes}`;
        let seconds: string = `${this.seconds}`;

        if (this.minutes <= 9) {
          minutes = `0${this.minutes}`;
        }

        if (this.seconds <= 9) {
          seconds = `0${this.seconds}`;
        }

        return `${minutes}:${seconds}`;
      })
    );
  }
}
