import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";

import { of } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";

import { MediaApiService } from "@features/display-front/services/media-api/media-api.service";

import { MediaActionTypes, LoadedMedias } from "../actions/media.actions";

@Injectable()
export class MediaEffects {
  @Effect()
  loadMedias$ = this.actions$.pipe(
    ofType(MediaActionTypes.LoadMedias),
    switchMap(() =>
      this.services.getMedias().pipe(
        map(media => new LoadedMedias(media)),
        catchError(err => of(err.status))
      )
    )
  );

  constructor(private actions$: Actions, private services: MediaApiService) {}
}
