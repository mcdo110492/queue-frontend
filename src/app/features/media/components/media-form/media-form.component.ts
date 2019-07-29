import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject
} from "@angular/core";
import { FormGroup } from "@angular/forms";

import { MAT_DIALOG_DATA } from "@angular/material";

import { FormlyFieldConfig } from "@ngx-formly/core";
import { MediaFormConfigService } from "@features/media/services/form/media-form-config.service";

import { Observable } from "rxjs";
import { take, filter } from "rxjs/operators";

import { MediaModel } from "@features/media/models/media.model";
import { MediaFacadeService } from "@features/media/facades/media-facade.service";

@Component({
  selector: "csab-media-form",
  templateUrl: "./media-form.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaFormComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  model: MediaModel = {
    id: null,
    title: null,
    weight: null,
    visibility: null,
    media_type: null,
    source: null
  };
  fields: FormlyFieldConfig[];
  isSaving$: Observable<boolean>;
  selectedMedia$: Observable<MediaModel>;
  save() {
    if (this.form.valid) {
      const formData = this.form.value;
      if (this.model.id) {
        this.facade.editMedia({ media: formData });
      }
    }
  }

  ngOnInit() {
    this.selectedMedia$
      .pipe(
        take(1),
        filter(Boolean)
      )
      .subscribe(data => {
        const { id, title, weight, visibility } = data;
        this.model = { ...this.model, id, title, weight, visibility };
      });
    this.fields = this.fieldService.generateFields(this.model.id);
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private facade: MediaFacadeService,
    private fieldService: MediaFormConfigService
  ) {
    this.isSaving$ = this.facade.isSaving$;
    this.selectedMedia$ = this.facade.selectedMedia$;
  }
}
