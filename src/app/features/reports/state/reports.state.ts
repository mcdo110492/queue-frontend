import { State, Action, StateContext } from '@ngxs/store';
import { ReportsAction } from './reports.actions';

export class ReportsStateModel {
  public items: string[];
}

@State<ReportsStateModel>({
  name: 'reports',
  defaults: {
    items: []
  }
})
export class ReportsState {
  @Action(ReportsAction)
  add(ctx: StateContext<ReportsStateModel>, action: ReportsAction) {
    const state = ctx.getState();
    ctx.setState({ items: [ ...state.items, action.payload ] });
  }
}
