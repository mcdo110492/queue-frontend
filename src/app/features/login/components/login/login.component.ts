import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { FormlyFieldConfig } from "@ngx-formly/core";

import { loginFormFields } from "@features/login/schemas";

@Component({
  selector: "csab-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({});
  model: any = {};
  formFields: FormlyFieldConfig[] = loginFormFields;

  authenticate() {
    console.log(this.model);
  }

  constructor() {}
}
