import { Injectable } from "@angular/core";

import { Store, Select } from "@ngxs/store";
import { Dispatch } from "@ngxs-labs/dispatch-decorator";

import {
  AddAnnouncement,
  AddAnnouncements,
  SelectAnnouncement,
  UpdateAnnouncement,
  IsLoading,
  IsSaving
} from "./../../state/announcements.actions";
import { AnnouncementsState } from "./../../state/announcements.state";
import { AnnouncementModel } from "./../../models/announcement.model";

import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { AnnouncementsApiService } from "@features/announcements/services/announcements-api/announcements-api.service";
import { EntityService } from "@core/services/entity/entity.service";
import { SnackBarService } from "@core/services/snack-bar/snack-bar.service";
import { MatDialog } from "@angular/material";

@Injectable()
export class AnnouncementsFacadeService {
  entities$: Observable<AnnouncementModel[]>;

  @Select(AnnouncementsState.isLoading) isLoading$: Observable<boolean>;
  @Select(AnnouncementsState.isSaving) isSaving$: Observable<boolean>;
  @Select(AnnouncementsState.selectedAnnouncement)
  selectedAnnouncement$: Observable<AnnouncementModel>;

  @Dispatch() loading = (isLoading: boolean) => new IsLoading(isLoading);
  @Dispatch() saving = (isSaving: boolean) => new IsSaving(isSaving);

  @Dispatch() loadList = () => {
    this.loading(true);
    return this.api.getLists().pipe(
      map(res => res.payload.data),
      map(data => {
        const announcements = this.entityService.arrayToEntities(data);
        this.loading(false);
        return new AddAnnouncements({ announcements });
      }),
      catchError(err => {
        this.snackBar.globalSnackBarError(err.status);
        return of(new IsLoading(false));
      })
    );
  };

  @Dispatch() create = (payload: { announcement: AnnouncementModel }) => {
    return this.api.create(payload.announcement).pipe(
      map(result => result.payload.data),
      map(announcements => {
        this.saving(false);
        this.snackBar.customSnackBar("success", "Saved", "OK");
        this.dialog.getDialogById("announcement-form-dialog").close();
        return new AddAnnouncement({ announcements });
      }),
      catchError(err => {
        this.snackBar.globalSnackBarError(err.status);
        return of(new IsSaving(false));
      })
    );
  };

  @Dispatch() select = (payload: number | string) =>
    new SelectAnnouncement(payload);

  @Dispatch() edit = (payload: { announcement: AnnouncementModel }) => {
    return this.api.update(payload.announcement).pipe(
      map(result => result.payload.data),
      map(announcement => {
        this.saving(false);
        this.snackBar.customSnackBar("success", "Updated", "OK");
        this.dialog.getDialogById("announcement-form-dialog").close();
        return new UpdateAnnouncement({ announcement });
      }),
      catchError(err => {
        this.snackBar.globalSnackBarError(err.status);
        return of(new IsSaving(false));
      })
    );
  };

  constructor(
    private store: Store,
    private api: AnnouncementsApiService,
    private entityService: EntityService,
    private snackBar: SnackBarService,
    private dialog: MatDialog
  ) {
    this.entities$ = this.store.select(state => {
      return this.entityService.entitiesToArray(state.announcements.entities);
    });
  }
}
