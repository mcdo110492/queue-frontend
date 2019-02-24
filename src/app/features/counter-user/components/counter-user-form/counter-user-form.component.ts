import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { FormlyFieldConfig } from "@ngx-formly/core";
import { CounterUserFormConfigService } from "@features/counter-user/services";

import { Observable } from "rxjs";
import { take, filter } from "rxjs/operators";

import { CounterUserModel } from "@features/counter-user/models";

import { Store } from "@ngrx/store";
import * as fromCounterUserReducer from "@features/counter-user/state/reducers/counter-user.reducer";
import * as fromCounterUserActions from "@features/counter-user/state/actions/counter-user.actions";
import * as fromCounterUserSelectors from "@features/counter-user/state/selectors/counter-user.select";

@Component({
  selector: "csab-counter-user-form",
  templateUrl: "./counter-user-form.component.html",
  styleUrls: ["./counter-user-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterUserFormComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  model: CounterUserModel = {
    id: null,
    counter_id: null,
    user_id: null
  };
  fields: FormlyFieldConfig[];
  isSaving$: Observable<boolean>;

  ngOnInit() {
    this.isSaving$ = this.store.select(
      fromCounterUserSelectors.selectCounterUserIsSaving
    );
    this.store
      .select(fromCounterUserSelectors.selectCurrentCounterUser)
      .pipe(
        take(1),
        filter(Boolean)
      )
      .subscribe(data => {
        const { id, counter_id, user_id } = data;
        this.model = { ...this.model, id, counter_id, user_id };
      });

    this.fields = this.service.generateFields(this.model.id);
  }

  save() {
    const model = { ...this.model };
    if (model.id) {
      this.store.dispatch(
        new fromCounterUserActions.UpdateCounterUserModel(model)
      );
    } else {
      this.store.dispatch(
        new fromCounterUserActions.CreateNewCounterUserModel(model)
      );
    }
  }

  constructor(
    private service: CounterUserFormConfigService,
    private store: Store<fromCounterUserReducer.State>
  ) {
    this.store.dispatch(new fromCounterUserActions.LoadCounterOptions());
    this.store.dispatch(new fromCounterUserActions.LoadUserOptions());
  }
}
