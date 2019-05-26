import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";

import { FormlyFieldConfig } from "@ngx-formly/core";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { UniqueValidatorService } from "@core/services/unique-validator/unique-validator.service";
import {
  DepartmentModel,
  StatusModel,
  RoleModel
} from "@features/user-management/models";

@Injectable()
export class UserManagementFormConfigService {
  generateFields(
    id: number,
    options: {
      departments$: Observable<DepartmentModel[]>;
      status$: Observable<StatusModel[]>;
      roles$: Observable<RoleModel[]>;
    }
  ): FormlyFieldConfig[] {
    const url: string = "users/validate";
    const isUpdate: string = id ? "false" : "true";
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
        key: "username",
        type: "input",
        templateOptions: {
          label: "Username",
          placeholder: "Must be at least 2 characters",
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
        key: "password",
        validators: {
          fieldMatch: {
            expression: control => {
              const value = control.value;

              return (
                value.passwordConfirm === value.password ||
                // avoid displaying the message error when values are empty
                (!value.passwordConfirm || !value.password)
              );
            },
            message: "Password does not match",
            errorPath: "passwordConfirm"
          }
        },
        fieldGroup: [
          {
            key: "password",
            type: "input",
            templateOptions: {
              type: "password",
              label: "Password",
              placeholder: "Must be at least 3 characters",
              minLength: 3
            },
            expressionProperties: {
              "templateOptions.required": isUpdate
            }
          },
          {
            key: "passwordConfirm",
            type: "input",
            templateOptions: {
              type: "password",
              label: "Confirm Password",
              placeholder: "Please re-enter your password"
            },
            expressionProperties: {
              "templateOptions.required": isUpdate
            }
          }
        ]
      },
      {
        key: "name",
        type: "input",
        templateOptions: {
          label: "Name",
          placeholder: "Must be at least 2 characters",
          required: true,
          appearance: "outline",
          minLength: 2
        }
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
        }
      },
      {
        key: "status",
        type: "select",
        templateOptions: {
          label: "Status",
          placeholder: "Select",
          labelProp: "status",
          valueProp: "id",
          required: true,
          options: options.status$,
          appearance: "outline"
        }
      },
      {
        key: "role",
        type: "select",
        templateOptions: {
          label: "Role",
          placeholder: "Select",
          labelProp: "role",
          valueProp: "id",
          required: true,
          options: options.roles$,
          appearance: "outline"
        }
      }
    ];

    return fields;
  }

  constructor(private service: UniqueValidatorService) {}
}
