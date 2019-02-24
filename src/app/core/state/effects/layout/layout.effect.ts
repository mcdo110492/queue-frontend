import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";

import { Actions, Effect, ofType } from "@ngrx/effects";

import { Observable, of } from "rxjs";
import { switchMap, concatMap } from "rxjs/operators";

import { SidebarlinkService } from "@core/services/layout/sidebarlink.service";

import {
  ActionTypes,
  AddSideBarLinks
} from "@core/state/actions/layout.action";

import * as fromUserState from "@core/state/reducers/user.reducer";
import * as fromUserSelectors from "@core/state/selectors/user.selector";

@Injectable()
export class LayoutEffects {
  @Effect()
  createLinks$: Observable<any> = this.actions$.pipe(
    ofType(ActionTypes.CREATE_lINKS),
    concatMap(() => this.userStore.select(fromUserSelectors.selectRole)),
    switchMap(role => {
      const links = this.service.createLinks(role);
      return of(new AddSideBarLinks(links));
    })
  );

  constructor(
    private actions$: Actions,
    private service: SidebarlinkService,
    private userStore: Store<fromUserState.State>
  ) {}
}
