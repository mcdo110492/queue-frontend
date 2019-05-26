import { UserManagementModel } from "./user-management.model";

export interface UserManagementCreateUpdateModel {
  payload: { data: UserManagementModel };
}

export interface UserManagementGetModel {
  payload: { count: number; data: UserManagementModel[] };
}
