import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "csab-display-counter-card",
  templateUrl: "./display-counter-card.component.html",
  styleUrls: ["./display-counter-card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayCounterCardComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
