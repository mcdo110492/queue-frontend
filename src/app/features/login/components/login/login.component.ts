import { Component, OnDestroy } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { FormlyFieldConfig } from "@ngx-formly/core";
import { loginFormFields } from "@features/login/schemas";

import { AuthFacadesService } from "@core/facades/auth-facades.service";

import { Observable } from "rxjs";

@Component({
  selector: "csab-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnDestroy {
  isAuthenticating$: Observable<boolean>;

  loginForm: FormGroup = new FormGroup({});
  model: any = {};
  formFields: FormlyFieldConfig[] = loginFormFields;

  authenticate() {
    const credentials = { ...this.model };
    this.facade.authenticate(credentials);
  }

  ngOnDestroy() {
    //reset the model and form
    this.loginForm.reset();
    this.model = {};
  }

  constructor(private facade: AuthFacadesService) {
    this.isAuthenticating$ = this.facade.isAuthenticating$;
  }
}
