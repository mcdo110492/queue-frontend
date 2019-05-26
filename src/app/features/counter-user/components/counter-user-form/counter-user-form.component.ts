import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from "@angular/core";
import { FormGroup } from "@angular/forms";

import { FormlyFieldConfig } from "@ngx-formly/core";
import { CounterUserFormConfigService } from "@features/counter-user/services";

import { Observable, Subscription } from "rxjs";
import { take, filter } from "rxjs/operators";

import {
  CounterUserModel,
  DepartmentModel
} from "@features/counter-user/models";
import { CounterUserFacadeService } from "@features/counter-user/facades/counter-user-facade.service";

import { CounterModel } from "@features/counter/models";
import { UserStateModel } from "@core/models";

@Component({
  selector: "csab-counter-user-form",
  templateUrl: "./counter-user-form.component.html",
  styleUrls: ["./counter-user-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterUserFormComponent implements OnInit, OnDestroy {
  subscription: Subscription;
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
  departments$: Observable<DepartmentModel[]>;

  ngOnInit() {
    this.isSaving$ = this.facade.isSaving$;
    this.counters$ = this.facade.counters$;
    this.users$ = this.facade.users$;
    this.departments$ = this.facade.departments$;

    const options = {
      counters$: this.counters$,
      users$: this.users$,
      departments$: this.departments$
    };

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

    setTimeout(() => {
      this.subscription = this.form
        .get("department_id")
        .valueChanges.subscribe(department_id => {
          this.facade.loadCounterOptions(department_id);
          this.facade.loadUserOptions(department_id);
        });
    }, 100);
  }

  save() {
    this.facade.saving(true);
    const formData = this.form.value;
    if (this.form.valid) {
      if (this.model.id) {
        this.facade.edit({ counterUser: formData });
      } else {
        this.facade.create({ counterUser: formData });
      }
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  constructor(
    private service: CounterUserFormConfigService,
    private facade: CounterUserFacadeService
  ) {
    this.facade.loadDepartments();
  }
}
