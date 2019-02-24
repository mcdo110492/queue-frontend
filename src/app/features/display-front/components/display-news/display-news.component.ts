import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "csab-display-news",
  templateUrl: "./display-news.component.html",
  styleUrls: ["./display-news.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayNewsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
