import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { FormlyFieldConfig } from "@ngx-formly/core";
import { CounterFormConfigService } from "@features/counter/services";

import { Observable } from "rxjs";
import { take, filter } from "rxjs/operators";

import { CounterModel } from "@features/counter/models/counter.model";
import { CounterFacadeService } from "@features/counter/facades/counter-facade.service";

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
      this.facade.editCounter({ counter: model });
    } else {
      this.facade.createCounter({ counter: model });
    }
  }

  ngOnInit() {
    this.facade.selectedCounter$
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
    private facade: CounterFacadeService
  ) {
    this.isSaving$ = this.facade.isSaving$;
  }
}
