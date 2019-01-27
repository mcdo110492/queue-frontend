import { ConfigOption } from "@ngx-formly/core";

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

export const config: ConfigOption = {
  validationMessages: [
    { name: "required", message: "This field is required" },
    { name: "minlength", message: minLenghtValidationMessage },
    { name: "maxLength", message: maxLengthValidationMessage },
    { name: "min", message: minValidationMessage },
    { name: "max", message: maxValidationMessage }
  ]
};
