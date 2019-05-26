import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";

import { FormlyFieldConfig } from "@ngx-formly/core";

import { map } from "rxjs/operators";

import { UniqueValidatorService } from "@core/services/unique-validator/unique-validator.service";

@Injectable()
export class DepartmentFormConfigService {
  generateFields(id: number | string): FormlyFieldConfig[] {
    const url: string = "departments/validate";
    const fields: FormlyFieldConfig[] = [
      {
        key: "id",
        type: "input",
        templateOptions: {
          label: "ID",
          type: "text"
        },
        hide: true
      },
      {
        key: "name",
        type: "input",
        templateOptions: {
          label: "Name",
          placeholder: "Input you' re name here",
          required: true,
          appearance: "outline",
          minLength: 2
        },
        modelOptions: {
          updateOn: "blur"
        },
        asyncValidators: {
          validation: [
            (control: FormControl) =>
              this.service
                .backendValidate(url, "name", control.value, id)
                .pipe(map(isUnique => (isUnique ? null : { isUnique: false })))
          ]
        },
        focus: true
      },
      {
        key: "code",
        type: "input",
        templateOptions: {
          label: "Code",
          placeholder: "Input you' re code here",
          required: true,
          type: "text",
          appearance: "outline",
          min: 1
        },
        modelOptions: {
          updateOn: "blur"
        },
        asyncValidators: {
          validation: [
            (control: FormControl) =>
              this.service
                .backendValidate(url, "code", control.value, id)
                .pipe(map(isUnique => (isUnique ? null : { isUnique: false })))
          ]
        }
      }
    ];

    return fields;
  }
  constructor(private service: UniqueValidatorService) {}
}
