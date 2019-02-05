import { CounterUserApiService } from "./counter-user-api/counter-user-api.service";
import { CounterUserFormConfigService } from "./counter-user-form-config/counter-user-form-config.service";

export const services: any[] = [
  CounterUserApiService,
  CounterUserFormConfigService
];

export * from "./counter-user-api/counter-user-api.service";
export * from "./counter-user-form-config/counter-user-form-config.service";
