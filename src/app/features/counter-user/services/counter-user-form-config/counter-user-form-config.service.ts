import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";

import { FormlyFieldConfig } from "@ngx-formly/core";

import { map } from "rxjs/operators";

import { Store } from "@ngrx/store";
import * as fromCounterUserReducer from "@features/counter-user/state/reducers/counter-user.reducer";
import * as fromCounterUserSelector from "@features/counter-user/state/selectors/counter-user.select";

import { UniqueValidatorService } from "@core/services/unique-validator/unique-validator.service";

@Injectable()
export class CounterUserFormConfigService {
  generateFields(id: number): FormlyFieldConfig[] {
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
        key: "counter_id",
        type: "select",
        templateOptions: {
          label: "Counter",
          valueProp: "id",
          labelProp: "counter_name",
          placeholder: "Select",
          options: this.store.select(
            fromCounterUserSelector.selectCounterOptions
          ),
          required: true,
          appearance: "outline"
        },
        modelOptions: {
          updateOn: "change",
          debounce: { default: 500 }
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
        },
        focus: true
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
          options: this.store.select(fromCounterUserSelector.selectUserOptions),
          appearance: "outline"
        },
        modelOptions: {
          updateOn: "change",
          debounce: { default: 500 }
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

  constructor(
    private service: UniqueValidatorService,
    private store: Store<fromCounterUserReducer.State>
  ) {}
}
