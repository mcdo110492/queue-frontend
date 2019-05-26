import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { FormlyFieldConfig } from "@ngx-formly/core";

import { Observable } from "rxjs";
import { take, filter } from "rxjs/operators";

import { DepartmentModel } from "@features/departments/models/department.model";
import { DeparmentsFacadeService } from "@features/departments/facades/deparments-facade.service";
import { DepartmentFormConfigService } from "@features/departments/services";

@Component({
  selector: "csab-department-form",
  templateUrl: "./department-form.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepartmentFormComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  model: DepartmentModel = {
    id: null,
    name: null,
    code: null
  };
  fields: FormlyFieldConfig[];
  isSaving$: Observable<boolean>;

  save() {
    if (this.form.valid) {
      const formData = this.form.value;
      if (this.model.id) {
        this.facade.editDepartment({ department: formData });
      } else {
        this.facade.createDepartment({ department: formData });
      }
    }
  }

  ngOnInit() {
    this.facade.selectedDepartment$
      .pipe(
        take(1),
        filter(Boolean)
      )
      .subscribe(data => {
        const { id, name, code } = data;
        this.model = { ...this.model, id, name, code };
      });
    this.fields = this.fieldService.generateFields(this.model.id);
  }

  constructor(
    private fieldService: DepartmentFormConfigService,
    private facade: DeparmentsFacadeService
  ) {
    this.isSaving$ = this.facade.isSaving$;
  }
}
