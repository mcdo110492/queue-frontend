import { Injectable } from "@angular/core";

import { FormlyFieldConfig } from "@ngx-formly/core";

@Injectable()
export class MediaFormConfigService {
  generateFields(id: number | string): FormlyFieldConfig[] {
    const fields: FormlyFieldConfig[] = [
      {
        key: "id",
        type: "input",
        templateOptions: {
          label: "ID",
          type: "text"
        },
        hide: true
      },
      {
        key: "title",
        type: "input",
        templateOptions: {
          label: "Title",
          placeholder: "Input you' re title here",
          type: "text",
          appearance: "outline"
        },
        focus: true
      },
      {
        key: "weight",
        type: "input",
        templateOptions: {
          label: "Weight",
          placeholder: "Weight determines the order of the media to be played",
          required: true,
          type: "number",
          appearance: "outline",
          min: 1
        }
      },
      {
        key: "visibility",
        type: "select",
        templateOptions: {
          label: "Visibility",
          valueProp: "id",
          labelProp: "name",
          placeholder: "Select",
          options: [{ id: 0, name: "Not Visible" }, { id: 1, name: "Visible" }],
          required: true,
          appearance: "outline"
        }
      }
    ];

    return fields;
  }
}
