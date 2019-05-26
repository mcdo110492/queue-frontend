import { DepartmentFormComponent } from "./department-form/department-form.component";
import { DepartmentListComponent } from "./department-list/department-list.component";

export const components: any[] = [
  DepartmentListComponent,
  DepartmentFormComponent
];

export const entryComponents: any[] = [DepartmentFormComponent];

export {
  DepartmentListComponent
} from "./department-list/department-list.component";
