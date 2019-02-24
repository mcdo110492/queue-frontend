import { Component, OnDestroy } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { FormlyFieldConfig } from "@ngx-formly/core";
import { loginFormFields } from "@features/login/schemas";

import { Store } from "@ngrx/store";
import * as fromUserActions from "@core/state/actions/user.action";
import * as fromUserState from "@core/state/reducers/user.reducer";

@Component({
  selector: "csab-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnDestroy {
  loginForm: FormGroup = new FormGroup({});
  model: any = {};
  formFields: FormlyFieldConfig[] = loginFormFields;

  authenticate() {
    const credentials = { ...this.model };
    this.store.dispatch(new fromUserActions.Authenticate(credentials));
  }

  ngOnDestroy() {
    //reset the model and form
    this.loginForm.reset();
    this.model = {};
  }

  constructor(private store: Store<fromUserState.State>) {}
}
