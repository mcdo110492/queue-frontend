import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "csab-dialog-loader",
  template: `
    <mat-progress-spinner
      strokeWidth="3"
      diameter="50"
      mode="indeterminate"
    ></mat-progress-spinner>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogLoaderComponent {}
