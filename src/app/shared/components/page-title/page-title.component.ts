import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "csab-page-title",
  template: `
    <div class="page-title-container">
      <div class="page-title">
        <span>{{ pageTitle }}</span>
      </div>

      <div class="additional-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [
    `
      .page-title-container {
        display: flex;
        flex-direction: row;
        margin: 10px auto;
      }

      .page-title {
        font-size: 1.5em;
        padding: 10px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageTitleComponent {
  @Input() pageTitle: string;
}
