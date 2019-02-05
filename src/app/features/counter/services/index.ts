import { CounterService } from "./counter-api/counter.service";
import { CounterFormConfigService } from "./counter-form-config/counter-form-config.service";

export const services: any[] = [CounterService, CounterFormConfigService];

export { CounterService } from "./counter-api/counter.service";
export {
  CounterFormConfigService
} from "./counter-form-config/counter-form-config.service";
