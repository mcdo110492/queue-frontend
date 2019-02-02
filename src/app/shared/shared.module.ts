import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

import * as fromComponents from "./components";

const MATERIAL_MODULES: any[] = [
  MatToolbarModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule
];

@NgModule({
  declarations: [...fromComponents.components],
  imports: [CommonModule, FormsModule, ...MATERIAL_MODULES],
  exports: [...fromComponents.components]
})
export class SharedModule {}
