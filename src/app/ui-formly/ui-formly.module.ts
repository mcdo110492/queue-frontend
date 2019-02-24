import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";

import { FormlyModule } from "@ngx-formly/core";
import { FormlyMaterialModule } from "@ngx-formly/material";

import { config } from "./config";
import * as fromWrappers from "./wrappers";
import * as fromTemplates from "./templates";

const MATERIAL_MODULES: any[] = [
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatIconModule
];

@NgModule({
  declarations: [...fromWrappers.wrappers, ...fromTemplates.templates],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FormlyMaterialModule,
    FormlyModule.forRoot(config),
    ...MATERIAL_MODULES
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    FormlyMaterialModule,
    FormlyModule
  ]
})
export class UiFormlyModule {}
