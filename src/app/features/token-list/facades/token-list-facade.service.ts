import { Injectable } from "@angular/core";

import { Store, Select } from "@ngxs/store";
import { Dispatch } from "@ngxs-labs/dispatch-decorator";

import {
  AddTokenLists,
  IsLoading,
  DoNothingAction
} from "./../state/token-list.actions";
import { TokenListState } from "./../state/token-list.state";

import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { EntityService } from "@core/services/entity/entity.service";
import { TokenListService } from "../services/api/token-list.service";
import { SnackBarService } from "@core/services/snack-bar/snack-bar.service";
import { TokenListModel } from "../models/token-list.model";

@Injectable()
export class TokenListFacadeService {
  entities$: Observable<TokenListModel[]>;

  @Select(TokenListState.isLoading) isLoading$: Observable<boolean>;

  @Dispatch() loading = (loading: boolean) => new IsLoading(loading);

  @Dispatch() loadTokens = (status: number) => {
    this.loading(true);
    return this.api.getList(status).pipe(
      map(result => result.payload.data),
      map(data => {
        let tokens = this.entityService.arrayToEntities(data);
        this.loading(false);
        return new AddTokenLists({ tokens });
      }),
      catchError(err => {
        this.loading(false);
        this.snackBar.globalSnackBarError(err.status);
        return of(new DoNothingAction());
      })
    );
  };

  constructor(
    private store: Store,
    private entityService: EntityService,
    private api: TokenListService,
    private snackBar: SnackBarService
  ) {
    this.entities$ = this.store.select(state => {
      return this.entityService.entitiesToArray(state.tokenList.entities);
    });
  }
}
