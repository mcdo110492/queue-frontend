import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import * as fromComponents from "./components";

@NgModule({
  declarations: [...fromComponents.components],
  imports: [CommonModule]
})
export class LoginModule {}
