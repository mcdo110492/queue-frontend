import { State, Action, StateContext, Selector } from "@ngxs/store";
import { produce } from "@ngxs-labs/immer-adapter";

import {
  AddDepartmentOptions,
  AddUserManagement,
  AddUserManagements,
  UpdateUserManagement,
  SelectUserManagement,
  IsLoading,
  IsSaving
} from "./user-management.actions";

import {
  UserManagementModel,
  DepartmentModel,
  StatusModel,
  RoleModel
} from "./../models";

export class UserManagementStateModel {
  isLoading: boolean;
  isSaving: boolean;
  selectedCounterId: number | string;
  entities: { [id: number]: UserManagementModel };
  departments: DepartmentModel[];
  status: StatusModel[];
  roles: RoleModel[];
}

@State<UserManagementStateModel>({
  name: "userManagement",
  defaults: {
    isLoading: false,
    isSaving: false,
    selectedCounterId: 0,
    entities: {},
    departments: [],
    status: [{ id: 0, status: "Inactive" }, { id: 1, status: "Active" }],
    roles: [{ id: 2, role: "Counter" }]
  }
})
export class UserManagementState {
  @Selector()
  static isLoading(state: UserManagementStateModel) {
    return state.isLoading;
  }

  @Selector()
  static isSaving(state: UserManagementStateModel) {
    return state.isSaving;
  }

  @Selector()
  static entities(state: UserManagementStateModel) {
    return state.entities;
  }

  @Selector()
  static selectedUser(state: UserManagementStateModel) {
    return state.selectedCounterId != 0
      ? state.entities[state.selectedCounterId]
      : null;
  }

  @Selector()
  static departments(state: UserManagementStateModel) {
    return state.departments;
  }

  @Selector()
  static status(state: UserManagementStateModel) {
    return state.status;
  }

  @Selector()
  static roles(state: UserManagementStateModel) {
    return state.roles;
  }

  @Selector()
  static departmentCount(state: UserManagementStateModel) {
    const { departments } = state;
    return departments ? departments.length : 0;
  }

  @Action(IsLoading)
  isLoading(
    ctx: StateContext<UserManagementStateModel>,
    { payload }: IsLoading
  ) {
    produce(ctx, (draft: UserManagementStateModel) => {
      draft.isLoading = payload;
    });
  }

  @Action(IsSaving)
  isSaving(ctx: StateContext<UserManagementStateModel>, { payload }: IsSaving) {
    produce(ctx, (draft: UserManagementStateModel) => {
      draft.isSaving = payload;
    });
  }

  @Action(AddUserManagements)
  addUserManagements(
    ctx: StateContext<UserManagementStateModel>,
    { payload: { users } }: AddUserManagements
  ) {
    produce(ctx, (draft: UserManagementStateModel) => {
      draft.entities = users;
    });
  }

  @Action(AddUserManagement)
  addUserManagement(
    ctx: StateContext<UserManagementStateModel>,
    { payload: { user } }: AddUserManagement
  ) {
    produce(ctx, (draft: UserManagementStateModel) => {
      const entity = { [user.id]: user };
      draft.entities = Object.assign(draft.entities, entity);
    });
  }

  @Action(SelectUserManagement)
  selectUserManagement(
    ctx: StateContext<UserManagementStateModel>,
    { payload }: SelectUserManagement
  ) {
    produce(ctx, (draft: UserManagementStateModel) => {
      draft.selectedCounterId = payload;
    });
  }

  @Action(UpdateUserManagement)
  updateUserManagement(
    ctx: StateContext<UserManagementStateModel>,
    { payload: { user } }: UpdateUserManagement
  ) {
    produce(ctx, (draft: UserManagementStateModel) => {
      draft.entities[user.id] = user;
      draft.isSaving = false;
    });
  }

  @Action(AddDepartmentOptions)
  addDepartmentOptions(
    ctx: StateContext<UserManagementStateModel>,
    { payload: { departments } }: AddDepartmentOptions
  ) {
    produce(ctx, (draft: UserManagementStateModel) => {
      draft.departments = departments;
    });
  }
}
