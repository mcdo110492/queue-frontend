import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { MaterialCompModule } from "@material/material-comp.module";

import { FormlyModule } from "@ngx-formly/core";
import { FormlyMaterialModule } from "@ngx-formly/material";

import { config } from "./config";
import { SuffixWrapperComponent } from "./wrappers";

@NgModule({
  declarations: [SuffixWrapperComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FormlyMaterialModule,
    MaterialCompModule,
    FormlyModule.forRoot(config)
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    FormlyMaterialModule,
    MaterialCompModule,
    FormlyModule
  ]
})
export class UiFormlyModule {}
