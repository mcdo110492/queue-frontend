import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";

import { Store } from "@ngrx/store";
import * as fromCounterUserReducer from "./../../store/reducers/counter-user.reducer";
import * as fromCounterUserSelector from "./../../store/selectors/counter-user.select";

import { FormlyFieldConfig } from "@ngx-formly/core";
import { map } from "rxjs/operators";

import { UniqueValidatorService } from "@helpers/unique-validator/unique-validator.service";

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
                .validateUnique(url, "counter_id", control.value, id)
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
                .validateUnique(url, "user_id", control.value, id)
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
