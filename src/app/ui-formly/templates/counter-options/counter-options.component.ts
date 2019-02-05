import { Component } from "@angular/core";
import { FieldType } from "@ngx-formly/core";

@Component({
  selector: "csab-counter-options",
  templateUrl: "./counter-options.component.html"
})
export class CounterOptionsComponent extends FieldType {
  constructor() {
    super();
  }
}
