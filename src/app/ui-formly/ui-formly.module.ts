import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { FormlyModule } from "@ngx-formly/core";
import { FormlyMaterialModule } from "@ngx-formly/material";

import { config } from "./config";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FormlyModule.forRoot(config),
    FormlyMaterialModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    FormlyModule,
    FormlyMaterialModule
  ]
})
export class UiFormlyModule {}
