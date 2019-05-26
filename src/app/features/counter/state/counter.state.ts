import { State, Action, StateContext, Selector } from "@ngxs/store";
import { produce } from "@ngxs-labs/immer-adapter";

import {
  AddCounter,
  SelectCounter,
  UpdateCounter,
  AddCounters,
  IsLoading,
  IsSaving,
  AddDepartmentOptions
} from "./counter.actions";

import { CounterModel } from "./../models";
import { DepartmentModel } from "../models/department.model";

export class CounterStateModel {
  isLoading: boolean;
  isSaving: boolean;
  selectedCounterId: number | string;
  entities: { [id: number]: CounterModel };
  departments: DepartmentModel[];
}

@State<CounterStateModel>({
  name: "counter",
  defaults: {
    isLoading: false,
    isSaving: false,
    selectedCounterId: 0,
    entities: {},
    departments: []
  }
})
export class CounterState {
  @Selector()
  static isLoading(state: CounterStateModel) {
    return state.isLoading;
  }

  @Selector()
  static isSaving(state: CounterStateModel) {
    return state.isSaving;
  }

  @Selector()
  static entities(state: CounterStateModel) {
    return state.entities;
  }

  @Selector()
  static selectedCounter(state: CounterStateModel) {
    return state.selectedCounterId != 0
      ? state.entities[state.selectedCounterId]
      : null;
  }

  @Selector()
  static departments(state: CounterStateModel) {
    return state.departments;
  }

  @Selector()
  static departmentCount(state: CounterStateModel) {
    const { departments } = state;
    return departments ? departments.length : 0;
  }

  @Action(IsLoading)
  isLoading(ctx: StateContext<CounterStateModel>, { payload }: IsLoading) {
    produce(ctx, (draft: CounterStateModel) => {
      draft.isLoading = payload;
    });
  }

  @Action(IsSaving)
  isSaving(ctx: StateContext<CounterStateModel>, { payload }: IsSaving) {
    produce(ctx, (draft: CounterStateModel) => {
      draft.isSaving = payload;
    });
  }

  @Action(AddCounters)
  addCounters(
    ctx: StateContext<CounterStateModel>,
    { payload: { counters } }: AddCounters
  ) {
    produce(ctx, (draft: CounterStateModel) => {
      draft.entities = counters;
    });
  }

  @Action(AddCounter)
  addCounter(
    ctx: StateContext<CounterStateModel>,
    { payload: { counter } }: AddCounter
  ) {
    produce(ctx, (draft: CounterStateModel) => {
      const entity = { [counter.id]: counter };
      draft.entities = Object.assign(draft.entities, entity);
    });
  }

  @Action(SelectCounter)
  selectCounter(
    ctx: StateContext<CounterStateModel>,
    { payload }: SelectCounter
  ) {
    produce(ctx, (draft: CounterStateModel) => {
      draft.selectedCounterId = payload;
    });
  }

  @Action(UpdateCounter)
  updateCounter(
    ctx: StateContext<CounterStateModel>,
    { payload: { counter } }: UpdateCounter
  ) {
    produce(ctx, (draft: CounterStateModel) => {
      draft.entities[counter.id] = counter;
      draft.isSaving = false;
    });
  }

  @Action(AddDepartmentOptions)
  addDepartmentOptions(
    ctx: StateContext<CounterStateModel>,
    { payload: { departments } }: AddDepartmentOptions
  ) {
    produce(ctx, (draft: CounterStateModel) => {
      draft.departments = departments;
    });
  }
}
