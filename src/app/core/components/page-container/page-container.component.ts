import { Component, ChangeDetectionStrategy } from "@angular/core";

import { fadeAnimation } from "@animations/fade.animation";

@Component({
  selector: "csab-page-container",
  template: `
    <csab-sidebar>
      <csab-toolbar></csab-toolbar>
      <div
        class="content"
        [@fadeAnimation]="o.isActivated ? o.activatedRoute : ''"
      >
        <router-outlet #o="outlet"></router-outlet>
      </div>
    </csab-sidebar>
  `,
  styles: [
    `
      .content {
        position: relative;
        box-sizing: border-box;
        margin: 10px 20px;
      }
    `
  ],
  animations: [fadeAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageContainerComponent {}
