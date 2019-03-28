import { Injectable } from "@angular/core";

import { Select, Store } from "@ngxs/store";
import { Dispatch } from "@ngxs-labs/dispatch-decorator";

import {
  AddCounterUser,
  AddCountersUser,
  SelectCounterUser,
  IsLoading,
  IsSaving,
  UpdateCounterUser,
  AddCounterOptions,
  AddUserOptions,
  DoNothingActions
} from "./../state/counter-user.actions";
import { CounterUserState } from "../state/counter-user.state";
import { CounterUserModel } from "../models";

import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { EntityService } from "@core/services/entity/entity.service";
import { CounterUserApiService } from "../services";
import { SnackBarService } from "@core/services/snack-bar/snack-bar.service";
import { MatDialog } from "@angular/material/dialog";
import { CounterModel } from "@features/counter/models";
import { UserStateModel } from "@core/models";

@Injectable()
export class CounterUserFacadeService {
  entities$: Observable<CounterUserModel[]>;

  @Select(CounterUserState.entities) rawEntities$: Observable<{
    [id: number]: CounterUserModel;
  }>;
  @Select(CounterUserState.isLoading) isLoading$: Observable<boolean>;
  @Select(CounterUserState.isSaving) isSaving$: Observable<boolean>;
  @Select(CounterUserState.selectedCounterUser)
  selectedCounterUser$: Observable<CounterUserModel>;
  @Select(CounterUserState.counters) counters$: Observable<CounterModel[]>;
  @Select(CounterUserState.users) users$: Observable<UserStateModel[]>;

  @Dispatch() loading = (loading: boolean) => new IsLoading(loading);
  @Dispatch() saving = (saving: boolean) => new IsSaving(saving);

  @Dispatch() loadCounterOptions = () => {
    const count = this.store.selectSnapshot(CounterUserState.counterCount);

    if (count === 0) {
      return this.api
        .loadCounters()
        .pipe(map(counters => new AddCounterOptions({ counters })));
    }

    return of(new DoNothingActions());
  };

  @Dispatch() loadUserOptions = () => {
    const count = this.store.selectSnapshot(CounterUserState.userCount);

    if (count === 0) {
      return this.api
        .loadUsers()
        .pipe(map(users => new AddUserOptions({ users })));
    }

    return of(new DoNothingActions());
  };

  @Dispatch() loadCountersUser = () => {
    this.loading(true);
    return this.api.getCountersUser().pipe(
      map(result => result.payload.data),
      map(data => {
        let countersUser = this.entityService.arrayToEntities(data);
        this.loading(false);
        return new AddCountersUser({ countersUser });
      }),
      catchError(err => {
        this.loading(false);
        this.snackBar.globalSnackBarError(err.status);
        return of(new DoNothingActions());
      })
    );
  };

  @Dispatch() create = (payload: { counterUser: CounterUserModel }) => {
    this.saving(true);
    return this.api.create(payload.counterUser).pipe(
      map(result => result.payload.data),
      map(counterUser => {
        this.saving(false);
        this.snackBar.customSnackBar("success", "Saved", "OK");
        this.dialog.getDialogById("counter-user-form-dialog").close();
        return new AddCounterUser({ counterUser });
      }),
      catchError(err => {
        this.saving(false);
        this.snackBar.globalSnackBarError(err.status);
        return of(new DoNothingActions());
      })
    );
  };

  @Dispatch() select = (payload: number) => new SelectCounterUser(payload);

  @Dispatch() edit = (payload: { counterUser: CounterUserModel }) => {
    this.saving(true);
    return this.api.update(payload.counterUser).pipe(
      map(result => result.payload.data),
      map(counterUser => {
        this.saving(false);
        this.snackBar.customSnackBar("success", "Updated", "OK");
        this.dialog.getDialogById("counter-user-form-dialog").close();
        return new UpdateCounterUser({ counterUser });
      }),
      catchError(err => {
        this.saving(false);
        this.snackBar.globalSnackBarError(err.status);
        return of(new DoNothingActions());
      })
    );
  };

  constructor(
    private api: CounterUserApiService,
    private dialog: MatDialog,
    private snackBar: SnackBarService,
    private entityService: EntityService,
    private store: Store
  ) {
    this.entities$ = this.rawEntities$.pipe(
      map(entities => this.entityService.entitiesToArray(entities))
    );
  }
}
