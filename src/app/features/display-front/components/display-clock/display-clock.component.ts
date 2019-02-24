import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { Observable, interval } from "rxjs";
import { map, share } from "rxjs/operators";

@Component({
  selector: "csab-display-clock",
  templateUrl: "./display-clock.component.html",
  styleUrls: ["./display-clock.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayClockComponent implements OnInit {
  date: Date;
  time: Observable<Date>;

  ngOnInit() {
    this.date = new Date();
  }

  constructor() {
    this.time = interval(1000).pipe(
      map(() => new Date()),
      share()
    );
  }
}
