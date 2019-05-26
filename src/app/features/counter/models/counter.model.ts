import { DepartmentModel } from "./department.model";

export interface CounterModel {
  id: number | string;
  department_id: number;
  position: number;
  department?: DepartmentModel;
}
