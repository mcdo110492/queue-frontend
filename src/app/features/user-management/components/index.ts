import { UserManagementFormComponent } from "./user-management-form/user-management-form.component";
import { UserManagementTableComponent } from "./user-management-table/user-management-table.component";

export const components: any[] = [
  UserManagementFormComponent,
  UserManagementTableComponent
];

export const entryComponents: any[] = [UserManagementFormComponent];

export {
  UserManagementTableComponent
} from "./user-management-table/user-management-table.component";
