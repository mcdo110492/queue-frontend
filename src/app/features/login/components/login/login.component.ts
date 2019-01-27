import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { FormlyFieldConfig } from "@ngx-formly/core";
import { loginFormFields } from "@features/login/schemas";

import { Store } from "@ngrx/store";
import { AddUserCredentials } from "@user-store/store/action";
import { State } from "@user-store/store/state";

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
    let credentials = {
      username: this.model.username,
      name: "Name",
      role: 1,
      token: "Token Exists",
      profileImage: "default.jpg"
    };
    this.store.dispatch(new AddUserCredentials(credentials));
  }

  constructor(private store: Store<State>) {}
}
