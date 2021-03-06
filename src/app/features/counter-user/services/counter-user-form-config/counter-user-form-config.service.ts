import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";

import { FormlyFieldConfig } from "@ngx-formly/core";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { UniqueValidatorService } from "@core/services/unique-validator/unique-validator.service";

import { CounterModel } from "@features/counter/models";
import { UserStateModel } from "@core/models";
import { DepartmentModel } from "@features/counter-user/models";

@Injectable()
export class CounterUserFormConfigService {
  generateFields(
    id: number,
    options: {
      counters$: Observable<CounterModel[]>;
      users$: Observable<UserStateModel[]>;
      departments$: Observable<DepartmentModel[]>;
    }
  ): FormlyFieldConfig[] {
    const url: string = "counters/users/validate";
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
          label: "Department",
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
        key: "counter_id",
        type: "select",
        templateOptions: {
          label: "Counter",
          valueProp: "id",
          labelProp: "position",
          placeholder: "Select",
          options: options.counters$,
          required: true,
          appearance: "outline"
        },
        modelOptions: {
          updateOn: "blur"
        },
        asyncValidators: {
          validation: [
            (control: FormControl) =>
              this.service
                .backendValidate(url, "counter_id", control.value, id)
                .pipe(
                  map(isNotAvailable =>
                    isNotAvailable ? null : { isNotAvailable: false }
                  )
                )
          ]
        }
      },
      {
        key: "user_id",
        type: "select",
        templateOptions: {
          label: "User",
          placeholder: "Select",
          labelProp: "username",
          valueProp: "id",
          required: true,
          options: options.users$,
          appearance: "outline"
        },
        modelOptions: {
          updateOn: "blur"
        },
        asyncValidators: {
          validation: [
            (control: FormControl) =>
              this.service
                .backendValidate(url, "user_id", control.value, id)
                .pipe(
                  map(isNotAvailable =>
                    isNotAvailable ? null : { isNotAvailable: false }
                  )
                )
          ]
        }
      }
    ];

    return fields;
  }

  constructor(private service: UniqueValidatorService) {}
}
