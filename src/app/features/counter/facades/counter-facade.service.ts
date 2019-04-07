import { Injectable } from "@angular/core";

import { Store, Select } from "@ngxs/store";
import { Dispatch } from "@ngxs-labs/dispatch-decorator";
import {
  AddCounter,
  SelectCounter,
  UpdateCounter,
  AddCounters,
  IsSaving,
  IsLoading
} from "./../state/counter.actions";
import { CounterState } from "./../state/counter.state";
import { CounterModel } from "../models";

import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { EntityService } from "@core/services/entity/entity.service";
import { CounterService } from "../services";
import { SnackBarService } from "@core/services/snack-bar/snack-bar.service";
import { MatDialog } from "@angular/material/dialog";

@Injectable()
export class CounterFacadeService {
  entities$: Observable<CounterModel[]>;

  @Select(CounterState.isLoading) isLoading$: Observable<boolean>;
  @Select(CounterState.isSaving) isSaving$: Observable<boolean>;
  @Select(CounterState.selectedCounter) selectedCounter$: Observable<
    CounterModel
  >;

  @Dispatch() loading = (loading: boolean) => new IsLoading(loading);

  @Dispatch() saving = (saving: boolean) => new IsSaving(saving);

  @Dispatch() loadCounters = () => {
    this.loading(true);
    return this.api.getCounters().pipe(
      map(result => result.payload.data),
      map(data => {
        let counters = this.entityService.arrayToEntities(data);
        this.loading(false);
        return new AddCounters({ counters });
      }),
      catchError(err => {
        this.loading(false);
        this.snackBar.globalSnackBarError(err.status);
        return of();
      })
    );
  };

  @Dispatch() createCounter = (payload: { counter: CounterModel }) => {
    return this.api.create(payload.counter).pipe(
      map(result => result.payload.data),
      map(counter => {
        this.saving(false);
        this.snackBar.customSnackBar("success", "Saved", "OK");
        this.dialog.getDialogById("counter-form-dialog").close();
        return new AddCounter({ counter });
      }),
      catchError(err => {
        this.saving(false);
        this.snackBar.globalSnackBarError(err.status);
        return of();
      })
    );
  };

  @Dispatch() selectCounter = (payload: number | string) =>
    new SelectCounter(payload);

  @Dispatch() editCounter = (payload: { counter: CounterModel }) => {
    return this.api.update(payload.counter).pipe(
      map(result => result.payload.data),
      map(counter => {
        this.saving(false);
        this.snackBar.customSnackBar("success", "Updated", "OK");
        this.dialog.getDialogById("counter-form-dialog").close();
        return new UpdateCounter({ counter });
      }),
      catchError(err => {
        this.saving(false);
        this.snackBar.globalSnackBarError(err.status);
        return of();
      })
    );
  };

  constructor(
    private store: Store,
    private entityService: EntityService,
    private api: CounterService,
    private snackBar: SnackBarService,
    private dialog: MatDialog
  ) {
    this.entities$ = this.store.select(state => {
      return this.entityService.entitiesToArray(state.counter.entities);
    });
  }
}
