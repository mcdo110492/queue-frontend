import { DepartmentModel } from "./department.model";

export interface DepartmentCreateResponsesModel {
  payload: { data: DepartmentModel };
}

export interface DepartmentGetResponseModel {
  payload: { count: number; data: DepartmentModel[] };
}
