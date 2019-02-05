import { CounterComponent } from "./counter/counter.component";
import { CounterFormComponent } from "./counter-form/counter-form.component";

export const components: any[] = [CounterComponent, CounterFormComponent];

export const entryComponents: any[] = [CounterFormComponent];

export * from "./counter/counter.component";
export * from "./counter-form/counter-form.component";
