import { Injectable } from "@angular/core";

import { Store, Select } from "@ngxs/store";
import { Dispatch } from "@ngxs-labs/dispatch-decorator";
import {
  AddMedias,
  UpdateMedia,
  SelectMedia,
  IsSaving,
  IsLoading,
  DoNothingActions
} from "./../state/media.actions";
import { MediaState } from "./../state/media.state";
import { MediaModel } from "../models/media.model";

import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { EntityService } from "@core/services/entity/entity.service";
import { MediaApiService } from "../services/api/media-api.service";
import { SnackBarService } from "@core/services/snack-bar/snack-bar.service";
import { MatDialog } from "@angular/material/dialog";

@Injectable()
export class MediaFacadeService {
  entities$: Observable<MediaModel[]>;

  @Select(MediaState.isLoading) isLoading$: Observable<boolean>;
  @Select(MediaState.isSaving) isSaving$: Observable<boolean>;
  @Select(MediaState.selectedMedia) selectedMedia$: Observable<MediaModel>;

  @Dispatch() loading = (loading: boolean) => new IsLoading(loading);

  @Dispatch() saving = (saving: boolean) => new IsSaving(saving);

  @Dispatch() loadMedias = () => {
    this.loading(true);
    return this.api.getMedias().pipe(
      map(result => result.payload.data),
      map(data => {
        let medias = this.entityService.arrayToEntities(data);
        this.loading(false);
        return new AddMedias({ medias });
      }),
      catchError(err => {
        this.loading(false);
        this.snackBar.globalSnackBarError(err.status);
        return of(new DoNothingActions());
      })
    );
  };

  @Dispatch() selectMedia = (payload: number | string) =>
    new SelectMedia(payload);

  @Dispatch() editMedia = (payload: { media: MediaModel }) => {
    return this.api.update(payload.media).pipe(
      map(result => result.payload.data),
      map(media => {
        this.saving(false);
        this.snackBar.customSnackBar("success", "Updated", "OK");
        this.dialog.getDialogById("counter-form-dialog").close();
        return new UpdateMedia({ media });
      }),
      catchError(err => {
        this.saving(false);
        this.snackBar.globalSnackBarError(err.status);
        return of(new DoNothingActions());
      })
    );
  };

  constructor(
    private store: Store,
    private entityService: EntityService,
    private api: MediaApiService,
    private snackBar: SnackBarService,
    private dialog: MatDialog
  ) {
    this.entities$ = this.store.select(state => {
      return this.entityService.entitiesToArray(state.media.entities);
    });
  }
}
