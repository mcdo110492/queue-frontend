import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";

import { FormlyFieldConfig } from "@ngx-formly/core";

import { map } from "rxjs/operators";

import { UniqueValidatorService } from "@core/services/unique-validator/unique-validator.service";

@Injectable()
export class AnnouncementsFormService {
  generateFields(id: number | string): FormlyFieldConfig[] {
    const url: string = "announcements/validate";
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
        key: "message",
        type: "textarea",
        templateOptions: {
          label: "Message",
          placeholder: "Input you' re message here",
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
              this.validator
                .backendValidate(url, "message", control.value, id)
                .pipe(map(isUnique => (isUnique ? null : { isUnique: false })))
          ]
        },
        focus: true
      },
      {
        key: "weight",
        type: "input",
        templateOptions: {
          label: "Weight",
          placeholder: "Input you' re weight here",
          required: true,
          appearance: "outline",
          min: 1,
          type: "number"
        },
        modelOptions: {
          updateOn: "blur"
        },
        asyncValidators: {
          validation: [
            (control: FormControl) =>
              this.validator
                .backendValidate(url, "weight", control.value, id)
                .pipe(map(isUnique => (isUnique ? null : { isUnique: false })))
          ]
        }
      },
      {
        key: "visibility",
        type: "select",
        templateOptions: {
          label: "Visible",
          labelProp: "name",
          valueProp: "id",
          placeholder: "Select Visibility",
          options: [{ id: 1, name: "Visible" }, { id: 0, name: "Not Visible" }],
          required: true,
          appearance: "outline"
        },
        defaultValue: 0
      }
    ];

    return fields;
  }

  constructor(private validator: UniqueValidatorService) {}
}
