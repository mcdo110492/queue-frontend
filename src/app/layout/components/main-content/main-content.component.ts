import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { fadeAnimation } from "@animations/fade.animation";

@Component({
  selector: "csab-main-content",
  templateUrl: "./main-content.component.html",
  styleUrls: ["./main-content.component.scss"],
  animations: [fadeAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainContentComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
