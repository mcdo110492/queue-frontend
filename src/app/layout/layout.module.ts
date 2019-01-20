import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialCompModule } from "./../material-comp";
import * as fromComponents from "./components";

@NgModule({
  declarations: [...fromComponents.components],
  imports: [CommonModule, MaterialCompModule],
  exports: [...fromComponents.components]
})
export class LayoutModule {}
