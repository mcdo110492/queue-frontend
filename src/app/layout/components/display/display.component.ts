import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { fadeAnimation } from "@animations/fade.animation";

@Component({
  selector: "csab-display",
  templateUrl: "./display.component.html",
  styleUrls: ["./display.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation]
})
export class DisplayComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
