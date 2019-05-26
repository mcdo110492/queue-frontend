import { State, Action, StateContext, Selector } from "@ngxs/store";
import { produce } from "@ngxs-labs/immer-adapter";

import {
  AddDepartment,
  AddDepartments,
  SelectDepartment,
  IsLoading,
  IsSaving,
  UpdateDepartment
} from "./departments.actions";

import { DepartmentModel } from "../models";

export class DepartmentsStateModel {
  isLoading: boolean;
  isSaving: boolean;
  selectedDepartmentId: number | string;
  entities: { [id: number]: DepartmentModel };
}

@State<DepartmentsStateModel>({
  name: "departments",
  defaults: {
    isLoading: false,
    isSaving: false,
    selectedDepartmentId: 0,
    entities: {}
  }
})
export class DepartmentsState {
  @Selector()
  static isLoading(state: DepartmentsStateModel) {
    return state.isLoading;
  }

  @Selector()
  static isSaving(state: DepartmentsStateModel) {
    return state.isSaving;
  }

  @Selector()
  static entities(state: DepartmentsStateModel) {
    return state.entities;
  }

  @Selector()
  static selectedDepartment(state: DepartmentsStateModel) {
    return state.selectedDepartmentId != 0
      ? state.entities[state.selectedDepartmentId]
      : null;
  }

  @Action(IsLoading)
  isLoading(ctx: StateContext<DepartmentsStateModel>, { payload }: IsLoading) {
    produce(ctx, (draft: DepartmentsStateModel) => {
      draft.isLoading = payload;
    });
  }

  @Action(IsSaving)
  isSaving(ctx: StateContext<DepartmentsStateModel>, { payload }: IsSaving) {
    produce(ctx, (draft: DepartmentsStateModel) => {
      draft.isSaving = payload;
    });
  }

  @Action(AddDepartments)
  addCounters(
    ctx: StateContext<DepartmentsStateModel>,
    { payload: { departments } }: AddDepartments
  ) {
    produce(ctx, (draft: DepartmentsStateModel) => {
      draft.entities = departments;
    });
  }

  @Action(AddDepartment)
  addCounter(
    ctx: StateContext<DepartmentsStateModel>,
    { payload: { department } }: AddDepartment
  ) {
    produce(ctx, (draft: DepartmentsStateModel) => {
      const entity = { [department.id]: department };
      draft.entities = Object.assign(draft.entities, entity);
    });
  }

  @Action(SelectDepartment)
  selectCounter(
    ctx: StateContext<DepartmentsStateModel>,
    { payload }: SelectDepartment
  ) {
    produce(ctx, (draft: DepartmentsStateModel) => {
      draft.selectedDepartmentId = payload;
    });
  }

  @Action(UpdateDepartment)
  updateDepartment(
    ctx: StateContext<DepartmentsStateModel>,
    { payload: { department } }: UpdateDepartment
  ) {
    produce(ctx, (draft: DepartmentsStateModel) => {
      draft.entities[department.id] = department;
      draft.isSaving = false;
    });
  }
}
