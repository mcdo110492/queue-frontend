import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { FormlyFieldConfig } from "@ngx-formly/core";
import { CounterFormConfigService } from "@features/counter/services";

import { Observable } from "rxjs";
import { take, filter } from "rxjs/operators";

import { Store } from "@ngrx/store";
import * as fromCounterReducer from "@features/counter/state/reducers/counter.reducer";
import * as fromCounterActions from "@features/counter/state/actions/counter.actions";
import * as fromCounterSelectors from "@features/counter/state/selectors/counter.select";

import { CounterModel } from "@features/counter/models/counter.model";

@Component({
  selector: "csab-counter-form",
  templateUrl: "./counter-form.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterFormComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  model: CounterModel = {
    id: null,
    counter_name: null,
    position: null
  };
  fields: FormlyFieldConfig[];
  isSaving$: Observable<boolean>;

  save() {
    const model = { ...this.model };
    if (model.id) {
      this.store.dispatch(new fromCounterActions.UpdateCounterModel(model));
    } else {
      this.store.dispatch(new fromCounterActions.CreateNewCounterModel(model));
    }
  }

  ngOnInit() {
    this.store
      .select(fromCounterSelectors.selectCurrentCounter)
      .pipe(
        take(1),
        filter(Boolean)
      )
      .subscribe(data => {
        const { id, counter_name, position } = data;
        this.model = { ...this.model, id, counter_name, position };
      });
    this.fields = this.fieldService.generateFields(this.model.id);
  }

  constructor(
    private fieldService: CounterFormConfigService,
    private store: Store<fromCounterReducer.State>
  ) {
    this.isSaving$ = this.store.select(
      fromCounterSelectors.selectCounterIsSaving
    );
  }
}
