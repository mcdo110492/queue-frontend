import { DepartmentModel } from "./department.model";

export interface UserManagementModel {
  id: number;
  username: string;
  password: string;
  passwordConfirm?: string;
  name: string;
  role: number;
  status: number;
  department_id: number;
  department?: DepartmentModel;
}
