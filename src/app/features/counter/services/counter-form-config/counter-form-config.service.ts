import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";

import { FormlyFieldConfig } from "@ngx-formly/core";

import { map } from "rxjs/operators";

import { UniqueValidatorService } from "@core/services/unique-validator/unique-validator.service";

@Injectable()
export class CounterFormConfigService {
  generateFields(id: number): FormlyFieldConfig[] {
    const url: string = "counters/validate";
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
        key: "counter_name",
        type: "input",
        templateOptions: {
          label: "Name",
          placeholder: "Input you' re name here",
          required: true,
          appearance: "outline",
          minLength: 2
        },
        modelOptions: {
          updateOn: "change",
          debounce: { default: 500 }
        },
        asyncValidators: {
          validation: [
            (control: FormControl) =>
              this.service
                .backendValidate(url, "counter_name", control.value, id)
                .pipe(map(isUnique => (isUnique ? null : { isUnique: false })))
          ]
        },
        focus: true
      },
      {
        key: "position",
        type: "input",
        templateOptions: {
          label: "Position",
          placeholder: "Input you' re position here",
          required: true,
          type: "number",
          appearance: "outline",
          min: 1
        },
        modelOptions: {
          updateOn: "change",
          debounce: { default: 500 }
        },
        asyncValidators: {
          validation: [
            (control: FormControl) =>
              this.service
                .backendValidate(url, "position", control.value, id)
                .pipe(map(isUnique => (isUnique ? null : { isUnique: false })))
          ]
        }
      }
    ];

    return fields;
  }

  constructor(private service: UniqueValidatorService) {}
}
