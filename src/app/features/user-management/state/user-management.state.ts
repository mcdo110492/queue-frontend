import { State, Action, StateContext } from '@ngxs/store';
import { UserManagementAction } from './user-management.actions';

export class UserManagementStateModel {
  public items: string[];
}

@State<UserManagementStateModel>({
  name: 'userManagement',
  defaults: {
    items: []
  }
})
export class UserManagementState {
  @Action(UserManagementAction)
  add(ctx: StateContext<UserManagementStateModel>, action: UserManagementAction) {
    const state = ctx.getState();
    ctx.setState({ items: [ ...state.items, action.payload ] });
  }
}
