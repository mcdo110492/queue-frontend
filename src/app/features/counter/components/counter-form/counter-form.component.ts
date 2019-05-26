import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { FormlyFieldConfig } from "@ngx-formly/core";
import { CounterFormConfigService } from "@features/counter/services";

import { Observable } from "rxjs";
import { take, filter } from "rxjs/operators";

import { CounterModel } from "@features/counter/models/counter.model";
import { CounterFacadeService } from "@features/counter/facades/counter-facade.service";
import { DepartmentModel } from "@features/counter/models/department.model";

@Component({
  selector: "csab-counter-form",
  templateUrl: "./counter-form.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterFormComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  model: CounterModel = {
    id: null,
    department_id: null,
    position: null
  };
  fields: FormlyFieldConfig[];
  isSaving$: Observable<boolean>;
  departments$: Observable<DepartmentModel[]>;

  save() {
    if (this.form.valid) {
      const formData = this.form.value;
      if (this.model.id) {
        this.facade.editCounter({ counter: formData });
      } else {
        this.facade.createCounter({ counter: formData });
      }
    }
  }

  ngOnInit() {
    this.facade.loadDepartmentOptions();
    const options = { departments$: this.departments$ };
    this.facade.selectedCounter$
      .pipe(
        take(1),
        filter(Boolean)
      )
      .subscribe(data => {
        const { id, department_id, position } = data;
        this.model = { ...this.model, id, department_id, position };
      });
    this.fields = this.fieldService.generateFields(this.model.id, options);
  }

  constructor(
    private fieldService: CounterFormConfigService,
    private facade: CounterFacadeService
  ) {
    this.isSaving$ = this.facade.isSaving$;
    this.departments$ = this.facade.departments$;
  }
}
