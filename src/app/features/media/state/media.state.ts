import { State, Action, StateContext, Selector } from "@ngxs/store";
import { produce } from "@ngxs-labs/immer-adapter";

import {
  AddMedias,
  UpdateMedia,
  SelectMedia,
  IsLoading,
  IsSaving
} from "./media.actions";

import { MediaModel } from "./../models/media.model";

export class MediaStateModel {
  isLoading: boolean;
  isSaving: boolean;
  selectedMediaId: number | string;
  entities: { [id: number]: MediaModel };
}

@State<MediaStateModel>({
  name: "media",
  defaults: {
    isLoading: false,
    isSaving: false,
    selectedMediaId: 0,
    entities: {}
  }
})
export class MediaState {
  @Selector()
  static isLoading(state: MediaStateModel) {
    return state.isLoading;
  }

  @Selector()
  static isSaving(state: MediaStateModel) {
    return state.isSaving;
  }

  @Selector()
  static entities(state: MediaStateModel) {
    return state.entities;
  }

  @Selector()
  static selectedMedia(state: MediaStateModel) {
    return state.selectedMediaId != 0
      ? state.entities[state.selectedMediaId]
      : null;
  }

  @Action(IsLoading)
  isLoading(ctx: StateContext<MediaStateModel>, { payload }: IsLoading) {
    produce(ctx, (draft: MediaStateModel) => {
      draft.isLoading = payload;
    });
  }

  @Action(IsSaving)
  isSaving(ctx: StateContext<MediaStateModel>, { payload }: IsSaving) {
    produce(ctx, (draft: MediaStateModel) => {
      draft.isSaving = payload;
    });
  }

  @Action(AddMedias)
  addMedias(
    ctx: StateContext<MediaStateModel>,
    { payload: { medias } }: AddMedias
  ) {
    produce(ctx, (draft: MediaStateModel) => {
      draft.entities = medias;
    });
  }

  @Action(SelectMedia)
  selectMedia(ctx: StateContext<MediaStateModel>, { payload }: SelectMedia) {
    produce(ctx, (draft: MediaStateModel) => {
      draft.selectedMediaId = payload;
    });
  }

  @Action(UpdateMedia)
  updateMedia(
    ctx: StateContext<MediaStateModel>,
    { payload: { media } }: UpdateMedia
  ) {
    produce(ctx, (draft: MediaStateModel) => {
      draft.entities[media.id] = media;
      draft.isSaving = false;
    });
  }
}
