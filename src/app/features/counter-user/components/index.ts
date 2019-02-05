import { CounterUserFormComponent } from "./counter-user-form/counter-user-form.component";
import { CounterUserListComponent } from "./counter-user-list/counter-user-list.component";

export const components: any[] = [
  CounterUserFormComponent,
  CounterUserListComponent
];

export const entryComponents: any[] = [CounterUserFormComponent];

export * from "./counter-user-form/counter-user-form.component";
export * from "./counter-user-list/counter-user-list.component";
