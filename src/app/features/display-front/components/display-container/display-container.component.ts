import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "csab-display-container",
  templateUrl: "./display-container.component.html",
  styleUrls: ["./display-container.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayContainerComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
