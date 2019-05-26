import { UserManagementContainerComponent } from "./user-management-container/user-management-container.component";
import { UserManagementFormComponent } from "./user-management-form/user-management-form.component";
import { UserManagementTableComponent } from "./user-management-table/user-management-table.component";

export const components: any[] = [
  UserManagementContainerComponent,
  UserManagementFormComponent,
  UserManagementTableComponent
];

export const entryComponents: any[] = [UserManagementFormComponent];

export {
  UserManagementContainerComponent
} from "./user-management-container/user-management-container.component";
