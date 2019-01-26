import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MaterialCompModule } from "@material/index";
import * as fromComponents from "./components";

@NgModule({
  declarations: [...fromComponents.components],
  imports: [CommonModule, RouterModule.forChild([]), MaterialCompModule]
})
export class LoginModule {}
