import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "csab-main-content",
  templateUrl: "./main-content.component.html",
  styleUrls: ["./main-content.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainContentComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
