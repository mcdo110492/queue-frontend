import { State, Action, StateContext, Selector } from "@ngxs/store";
import { produce } from "@ngxs-labs/immer-adapter";

import {
  IsLoading,
  IsSaving,
  AddCountersUser,
  AddCounterUser,
  UpdateCounterUser,
  SelectCounterUser,
  AddCounterOptions,
  AddUserOptions
} from "./counter-user.actions";

import { CounterUserModel } from "../models";
import { CounterModel } from "@features/counter/models";
import { UserStateModel } from "@core/models";

export class CounterUserStateModel {
  isLoading: boolean;
  isSaving: boolean;
  selectedCounterId: number | string;
  entities: { [id: number]: CounterUserModel };
  counters: CounterModel[];
  users: UserStateModel[];
}

@State<CounterUserStateModel>({
  name: "counterUser",
  defaults: {
    isLoading: false,
    isSaving: false,
    selectedCounterId: 0,
    entities: {},
    counters: [],
    users: []
  }
})
export class CounterUserState {
  @Selector()
  static counters(state: CounterUserStateModel) {
    return state.counters;
  }

  @Selector()
  static counterCount(state: CounterUserStateModel) {
    const { counters } = state;
    return counters ? counters.length : 0;
  }

  @Selector()
  static users(state: CounterUserStateModel) {
    return state.users;
  }

  @Selector()
  static userCount(state: CounterUserStateModel) {
    const { users } = state;
    return users ? users.length : 0;
  }

  @Selector()
  static isLoading(state: CounterUserStateModel) {
    return state.isLoading;
  }

  @Selector()
  static isSaving(state: CounterUserStateModel) {
    CounterUserStateModel;
    return state.isSaving;
  }

  @Selector()
  static entities(state: CounterUserStateModel) {
    return state.entities;
  }

  @Selector()
  static selectedCounterUser(state: CounterUserStateModel) {
    return state.selectedCounterId != 0
      ? state.entities[state.selectedCounterId]
      : null;
  }

  @Action(IsLoading)
  isLoading(ctx: StateContext<CounterUserStateModel>, { payload }: IsLoading) {
    produce(ctx, (draft: CounterUserStateModel) => {
      draft.isLoading = payload;
    });
  }

  @Action(IsSaving)
  issaving(ctx: StateContext<CounterUserStateModel>, { payload }: IsSaving) {
    produce(ctx, (draft: CounterUserStateModel) => {
      draft.isSaving = payload;
    });
  }

  @Action(AddCountersUser)
  addCounters(
    ctx: StateContext<CounterUserStateModel>,
    { payload: { countersUser } }: AddCountersUser
  ) {
    produce(ctx, (draft: CounterUserStateModel) => {
      draft.entities = countersUser;
    });
  }

  @Action(AddCounterUser)
  addCounter(
    ctx: StateContext<CounterUserStateModel>,
    { payload: { counterUser } }: AddCounterUser
  ) {
    produce(ctx, (draft: CounterUserStateModel) => {
      const entity = { [counterUser.id]: counterUser };
      draft.entities = Object.assign(draft.entities, entity);
    });
  }

  @Action(SelectCounterUser)
  selectCounter(
    ctx: StateContext<CounterUserStateModel>,
    { payload }: SelectCounterUser
  ) {
    produce(ctx, (draft: CounterUserStateModel) => {
      draft.selectedCounterId = payload;
    });
  }

  @Action(UpdateCounterUser)
  updateCounter(
    ctx: StateContext<CounterUserStateModel>,
    { payload: { counterUser } }: UpdateCounterUser
  ) {
    produce(ctx, (draft: CounterUserStateModel) => {
      draft.entities[counterUser.id] = counterUser;
      draft.isSaving = false;
    });
  }

  @Action(AddCounterOptions)
  addCounterOptions(
    ctx: StateContext<CounterUserStateModel>,
    { payload: { counters } }: AddCounterOptions
  ) {
    produce(ctx, (draft: CounterUserStateModel) => {
      draft.counters = counters;
    });
  }

  @Action(AddUserOptions)
  addUserOptions(
    ctx: StateContext<CounterUserStateModel>,
    { payload: { users } }: AddUserOptions
  ) {
    produce(ctx, (draft: CounterUserStateModel) => {
      draft.users = users;
    });
  }
}
