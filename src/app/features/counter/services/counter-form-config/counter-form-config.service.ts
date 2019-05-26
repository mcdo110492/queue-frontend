import { Injectable } from "@angular/core";

import { FormlyFieldConfig } from "@ngx-formly/core";

import { Observable } from "rxjs";

import { UniqueValidatorService } from "@core/services/unique-validator/unique-validator.service";
import { DepartmentModel } from "@features/counter/models/department.model";

@Injectable()
export class CounterFormConfigService {
  generateFields(
    id: number | string,
    options: { departments$: Observable<DepartmentModel[]> }
  ): FormlyFieldConfig[] {
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
        key: "department_id",
        type: "select",
        templateOptions: {
          label: "Departments",
          valueProp: "id",
          labelProp: "name",
          placeholder: "Select",
          options: options.departments$,
          required: true,
          appearance: "outline"
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
        }
      }
    ];

    return fields;
  }

  constructor(private service: UniqueValidatorService) {}
}
