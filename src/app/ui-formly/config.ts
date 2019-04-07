import { ConfigOption } from "@ngx-formly/core";
import { SuffixWrapperComponent } from "./wrappers";
import { CounterOptionsComponent } from "./templates";

function minLenghtValidationMessage(err, field) {
  return `Should have atleast ${field.templateOptions.minLength} characters`;
}

function maxLengthValidationMessage(err, field) {
  return `This value should be less than ${
    field.templateOptions.maxLength
  } characters`;
}

function minValidationMessage(err, field) {
  return `This value should be more than ${
    field.templateOptions.min
  } characters`;
}

function maxValidationMessage(err, field) {
  return `This value should be less than ${
    field.templateOptions.max
  } characters`;
}

function isNotAvailable(err, field) {
  return `This is not available anymore. Please select or choose another one`;
}

function showErrorOptions(field) {
  return (
    (field.formState.submitted ||
      field.formControl.touched ||
      (field.field.validation && field.field.validation.show)) &&
    !field.formControl.valid
  );
}

export const config: ConfigOption = {
  validationMessages: [
    { name: "required", message: "This field is required" },
    { name: "minlength", message: minLenghtValidationMessage },
    { name: "maxLength", message: maxLengthValidationMessage },
    { name: "min", message: minValidationMessage },
    { name: "max", message: maxValidationMessage },
    { name: "isUnique", message: "This field must be unique" },
    { name: "isNotAvailable", message: isNotAvailable }
  ],
  wrappers: [{ name: "suffix", component: SuffixWrapperComponent }],
  types: [{ name: "counterOptions", component: CounterOptionsComponent }],
  extras: { showError: showErrorOptions }
};
