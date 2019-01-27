import { FormlyFieldConfig } from "@ngx-formly/core";

export const loginFormFields: FormlyFieldConfig[] = [
  {
    key: "username",
    type: "input",
    wrappers: ["suffix", "form-field"],
    templateOptions: {
      label: "Username",
      placeholder: "Input your username",
      required: true,
      appearance: "outline",
      suffixIcon: "account_circle"
    },
    focus: true
  },
  {
    key: "password",
    type: "input",
    wrappers: ["suffix", "form-field"],
    templateOptions: {
      label: "Password",
      placeholder: "Input your password",
      required: true,
      type: "password",
      appearance: "outline",
      suffixIcon: "lock"
    }
  }
];
