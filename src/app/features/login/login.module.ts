import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from "@angular/material/progress-bar";

import { UiFormlyModule } from "@ui-formly/ui-formly.module";

import * as fromComponents from "./components";
import * as fromServices from "./services";

const MATERIAL_MODULES: any[] = [
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatIconModule,
  MatProgressBarModule
];

@NgModule({
  declarations: [...fromComponents.components],
  imports: [CommonModule, UiFormlyModule, ...MATERIAL_MODULES],
  providers: [...fromServices.services]
})
export class LoginModule {}
