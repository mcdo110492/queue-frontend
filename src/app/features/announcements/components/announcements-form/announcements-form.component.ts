import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { FormlyFieldConfig } from "@ngx-formly/core";
import { AnnouncementsFormService } from "@features/announcements/services/announcements-form/announcements-form.service";

import { Observable } from "rxjs";
import { take, filter } from "rxjs/operators";

import { AnnouncementModel } from "@features/announcements/models/announcement.model";
import { AnnouncementsFacadeService } from "@features/announcements/facade/announcements-facade/announcements-facade.service";

@Component({
  selector: "csab-announcements-form",
  templateUrl: "./announcements-form.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnnouncementsFormComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  model: AnnouncementModel = {
    id: null,
    message: null,
    weight: null,
    visibility: 0
  };
  fields: FormlyFieldConfig[];
  isSaving$: Observable<boolean>;

  save() {
    if (this.form.valid) {
      const formData = this.form.value;
      if (this.model.id) {
        this.facade.edit({ announcement: formData });
      } else {
        this.facade.create({ announcement: formData });
      }
    }
  }

  ngOnInit() {
    this.facade.selectedAnnouncement$
      .pipe(
        take(1),
        filter(Boolean)
      )
      .subscribe(data => {
        const { id, message, weight, visibility } = data;
        this.model = { ...this.model, id, message, weight, visibility };
      });

    this.fields = this.fieldService.generateFields(this.model.id);
  }

  constructor(
    private fieldService: AnnouncementsFormService,
    private facade: AnnouncementsFacadeService
  ) {
    this.isSaving$ = this.facade.isSaving$;
  }
}
