import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { FormlyFieldConfig } from "@ngx-formly/core";
import { CounterUserFormConfigService } from "@features/counter-user/services";

import { Observable } from "rxjs";
import { take, filter } from "rxjs/operators";

import { CounterUserModel } from "@features/counter-user/models";
import { CounterUserFacadeService } from "@features/counter-user/facades/counter-user-facade.service";

import { CounterModel } from "@features/counter/models";
import { UserStateModel } from "@core/models";

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
  counters$: Observable<CounterModel[]>;
  users$: Observable<UserStateModel[]>;

  ngOnInit() {
    this.isSaving$ = this.facade.isSaving$;
    this.counters$ = this.facade.counters$;
    this.users$ = this.facade.users$;

    let options = { counters$: this.counters$, users$: this.users$ };

    this.facade.selectedCounterUser$
      .pipe(
        take(1),
        filter(Boolean)
      )
      .subscribe(data => {
        const { id, counter_id, user_id } = data;
        this.model = { ...this.model, id, counter_id, user_id };
      });

    this.fields = this.service.generateFields(this.model.id, options);
  }

  save() {
    const model = { ...this.model };
    if (model.id) {
      this.facade.edit({ counterUser: model });
    } else {
      this.facade.create({ counterUser: model });
    }
  }

  constructor(
    private service: CounterUserFormConfigService,
    private facade: CounterUserFacadeService
  ) {
    this.facade.loadCounterOptions();
    this.facade.loadUserOptions();
  }
}
