import { Injectable } from "@angular/core";

import { Select } from "@ngxs/store";
import { Dispatch } from "@ngxs-labs/dispatch-decorator";

import {
  AddToken,
  AddTokens,
  AddAnnouncements,
  AddMedias,
  IsAnnouncementLoading,
  IsMedialLoading,
  IsTokenLoading,
  OnServerError
} from "./../state/display-front.actions";
import { DisplayFrontState } from "./../state/display-front.state";

import { Observable, of } from "rxjs";
import { map, catchError, switchMap } from "rxjs/operators";
import {
  MediaApiService,
  AnnouncementApiService,
  TokenDisplayApiService
} from "../services";
import { TokenModel, MediaModel, AnnouncementModel } from "../models";
import { SnackBarService } from "@core/services/snack-bar/snack-bar.service";

@Injectable()
export class DisplayFrontFacadeService {
  @Select(DisplayFrontState.isAnnouncementLoading)
  isAnnouncementLoading$: Observable<boolean>;
  @Select(DisplayFrontState.isMediaLoading) isMediaLoading$: Observable<
    boolean
  >;
  @Select(DisplayFrontState.isTokenLoading) isTokenLoading$: Observable<
    boolean
  >;
  @Select(DisplayFrontState.getPastToken) pastTokens$: Observable<TokenModel[]>;
  @Select(DisplayFrontState.getLatestToken) latestToken$: Observable<
    TokenModel
  >;
  @Select(DisplayFrontState.medias) medias$: Observable<MediaModel[]>;
  @Select(DisplayFrontState.announcements) anouncements$: Observable<
    AnnouncementModel[]
  >;

  @Dispatch() announcementLoading = (isLoading: boolean) =>
    new IsAnnouncementLoading(isLoading);
  @Dispatch() mediaLoading = (isLoading: boolean) =>
    new IsMedialLoading(isLoading);
  @Dispatch() tokenLoading = (isLoading: boolean) =>
    new IsTokenLoading(isLoading);

  @Dispatch() loadMedia = () => {
    this.mediaLoading(true);
    return this.mediaApi.getMedias().pipe(
      map(medias => {
        this.mediaLoading(false);
        return new AddMedias({ medias });
      }),
      catchError(err => {
        this.mediaLoading(false);
        this.snackBar.globalSnackBarError(err.status);
        return of(new OnServerError(err.status));
      })
    );
  };

  @Dispatch() loadAnnouncements = () => {
    this.announcementLoading(true);
    return this.announcementApi.getVisible().pipe(
      map(result => result.payload.data),
      map(announcements => {
        this.announcementLoading(false);
        return new AddAnnouncements({ announcements });
      }),
      catchError(err => {
        this.announcementLoading(false);
        this.snackBar.globalSnackBarError(err.status);
        return of(new OnServerError(err.status));
      })
    );
  };

  @Dispatch() addNewToken = (token: TokenModel) => new AddToken({ token });

  constructor(
    private mediaApi: MediaApiService,
    private announcementApi: AnnouncementApiService,
    private tokenApi: TokenDisplayApiService,
    private snackBar: SnackBarService
  ) {}
}
