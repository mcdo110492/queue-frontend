import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "csab-issue-token-view",
  template: `
    <csab-issue-token-form></csab-issue-token-form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IssueTokenViewComponent {}
