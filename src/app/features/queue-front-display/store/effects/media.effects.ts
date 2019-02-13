import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";

import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";

import { SnackBarHelperService } from "@helpers/snack-bar-helper/snack-bar-helper.service";
import { QueueFrontDisplayApiService } from "@features/queue-front-display/services/queue-front-display-api/queue-front-display-api.service";

import {
  MediaDisplayActionTypes,
  AddMedias,
  OnServerError
} from "../actions/media-display.action";

@Injectable()
export class MediaEffects {
  @Effect()
  loadMedias$ = this.actions$.pipe(
    ofType(MediaDisplayActionTypes.LOAD_MEDIA),
    switchMap(() => {
      return this.service.getMedia().pipe(
        map(res => new AddMedias({ medias: res.payload })),
        catchError(err => {
          this.snackBar.snackError(err.status);
          return of();
        })
      );
    })
  );

  @Effect({ dispatch: false })
  onServerErr$ = this.actions$.pipe(
    ofType<OnServerError>(MediaDisplayActionTypes.ON_SERVER_ERROR),
    map(action => {
      this.snackBar.snackError(action.payload.status);
    })
  );

  constructor(
    private actions$: Actions,
    private service: QueueFrontDisplayApiService,
    private snackBar: SnackBarHelperService
  ) {}
}
