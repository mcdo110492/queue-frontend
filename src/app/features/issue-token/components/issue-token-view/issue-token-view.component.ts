import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "csab-issue-token-view",
  template: `
    <div class="token-view-bg">
      <csab-issue-token-form></csab-issue-token-form>
    </div>
  `,
  styleUrls: ["./issue-token-view.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IssueTokenViewComponent {}
