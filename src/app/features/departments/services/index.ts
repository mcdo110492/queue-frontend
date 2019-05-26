import { DepartmentApiService } from "./department-api/department-api.service";
import { DepartmentFormConfigService } from "./department-form-config/department-form-config.service";

export const services: any[] = [
  DepartmentApiService,
  DepartmentFormConfigService
];

export { DepartmentApiService } from "./department-api/department-api.service";
export {
  DepartmentFormConfigService
} from "./department-form-config/department-form-config.service";
