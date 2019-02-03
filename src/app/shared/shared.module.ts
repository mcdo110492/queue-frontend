import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatButtonModule } from "@angular/material/button";

import * as fromComponents from "./components";
import { TableComponent } from "./components/table/table.component";

const MATERIAL_MODULES: any[] = [
  MatToolbarModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatButtonModule
];

@NgModule({
  declarations: [...fromComponents.components, TableComponent],
  imports: [CommonModule, FormsModule, ...MATERIAL_MODULES],
  exports: [...fromComponents.components]
})
export class SharedModule {}
