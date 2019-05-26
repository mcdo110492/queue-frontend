import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { FormlyFieldConfig } from "@ngx-formly/core";
import { UserManagementFormConfigService } from "@features/user-management/services/form/user-management-form-config.service";

import { Observable } from "rxjs";
import { take, filter } from "rxjs/operators";

import { UserManagementModel } from "@features/user-management/models/user-management.model";
import { UserManagementFacadeService } from "@features/user-management/facades/user-management-facade.service";
import {
  DepartmentModel,
  StatusModel,
  RoleModel
} from "@features/user-management/models";

@Component({
  selector: "csab-user-management-form",
  templateUrl: "./user-management-form.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserManagementFormComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  model: UserManagementModel = {
    id: null,
    username: null,
    password: null,
    passwordConfirm: null,
    name: null,
    status: null,
    department_id: null,
    role: null
  };
  fields: FormlyFieldConfig[];
  isSaving$: Observable<boolean>;
  departments$: Observable<DepartmentModel[]>;
  status$: Observable<StatusModel[]>;
  roles$: Observable<RoleModel[]>;

  save() {
    if (this.form.valid) {
      const formData = this.form.value;
      if (this.model.id) {
        this.facade.editUser({ user: formData });
      } else {
        this.facade.createUser({ user: formData });
      }
    }
  }

  ngOnInit() {
    this.facade.loadDepartmentOptions();
    const options = {
      departments$: this.departments$,
      status$: this.status$,
      roles$: this.roles$
    };
    this.facade.selectedUser$
      .pipe(
        take(1),
        filter(Boolean)
      )
      .subscribe(data => {
        const { id, department_id, username, name, status, role } = data;
        this.model = {
          ...this.model,
          id,
          username,
          name,
          status,
          role,
          department_id
        };
      });
    this.fields = this.fieldService.generateFields(this.model.id, options);
  }

  constructor(
    private fieldService: UserManagementFormConfigService,
    private facade: UserManagementFacadeService
  ) {
    this.isSaving$ = this.facade.isSaving$;
    this.departments$ = this.facade.departments$;
    this.status$ = this.facade.status$;
    this.roles$ = this.facade.roles$;
  }
}
