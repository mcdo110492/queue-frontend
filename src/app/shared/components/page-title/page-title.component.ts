import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "csab-page-title",
  templateUrl: "./page-title.component.html",
  styleUrls: ["./page-title.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageTitleComponent {
  @Input() pageTitle: string;
}
