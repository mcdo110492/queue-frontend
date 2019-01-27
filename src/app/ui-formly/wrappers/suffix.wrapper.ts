import {
  Component,
  ViewChild,
  ViewContainerRef,
  TemplateRef,
  AfterViewInit
} from "@angular/core";
import { FieldWrapper } from "@ngx-formly/core";

@Component({
  selector: "formly-suffix-wrapper",
  template: `
    <ng-container #fieldComponent></ng-container>
    <ng-template #matSuffix>
      <mat-icon *ngIf="to.suffixIcon">{{ to.suffixIcon }}</mat-icon>
    </ng-template>
  `
})
export class SuffixWrapperComponent extends FieldWrapper
  implements AfterViewInit {
  @ViewChild("fieldComponent", { read: ViewContainerRef })
  fieldComponent: ViewContainerRef;
  @ViewChild("matSuffix") matSuffix: TemplateRef<any>;

  ngAfterViewInit() {
    if (this.matSuffix) {
      this.to.suffix = this.matSuffix;
    }
  }
}
