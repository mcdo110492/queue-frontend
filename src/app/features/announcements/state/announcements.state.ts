import { State, Action, StateContext, Selector } from "@ngxs/store";
import { produce } from "@ngxs-labs/immer-adapter";

import {
  AddAnnouncement,
  AddAnnouncements,
  SelectAnnouncement,
  UpdateAnnouncement,
  IsLoading,
  IsSaving
} from "./announcements.actions";

import { AnnouncementModel } from "./../models/announcement.model";

export class AnnouncementsStateModel {
  isLoading: boolean;
  isSaving: boolean;
  selectedAnnouncementId: number | string;
  entities: { [id: number]: AnnouncementModel };
}

@State<AnnouncementsStateModel>({
  name: "announcements",
  defaults: {
    isLoading: false,
    isSaving: false,
    selectedAnnouncementId: 0,
    entities: {}
  }
})
export class AnnouncementsState {
  @Selector()
  static isLoading(state: AnnouncementsStateModel) {
    return state.isLoading;
  }

  @Selector()
  static isSaving(state: AnnouncementsStateModel) {
    return state.isSaving;
  }

  @Selector()
  static entities(state: AnnouncementsStateModel) {
    return state.entities;
  }

  @Selector()
  static selectedAnnouncement(state: AnnouncementsStateModel) {
    return state.selectedAnnouncementId != 0
      ? state.entities[state.selectedAnnouncementId]
      : null;
  }

  @Action(IsLoading)
  isLoading(
    ctx: StateContext<AnnouncementsStateModel>,
    { payload }: IsLoading
  ) {
    produce(ctx, (draft: AnnouncementsStateModel) => {
      draft.isLoading = payload;
    });
  }

  @Action(IsSaving)
  isSaving(ctx: StateContext<AnnouncementsStateModel>, { payload }: IsSaving) {
    produce(ctx, (draft: AnnouncementsStateModel) => {
      draft.isSaving = payload;
    });
  }

  @Action(AddAnnouncements)
  addAnnouncements(
    ctx: StateContext<AnnouncementsStateModel>,
    { payload: { announcements } }: AddAnnouncements
  ) {
    produce(ctx, (draft: AnnouncementsStateModel) => {
      draft.entities = announcements;
    });
  }

  @Action(AddAnnouncement)
  addAnnouncement(
    ctx: StateContext<AnnouncementsStateModel>,
    { payload: { announcements } }: AddAnnouncement
  ) {
    produce(ctx, (draft: AnnouncementsStateModel) => {
      const entity = { [announcements.id]: announcements };
      draft.entities = Object.assign(draft.entities, entity);
    });
  }

  @Action(SelectAnnouncement)
  selectAnnouncement(
    ctx: StateContext<AnnouncementsStateModel>,
    { payload }: SelectAnnouncement
  ) {
    produce(ctx, (draft: AnnouncementsStateModel) => {
      draft.selectedAnnouncementId = payload;
    });
  }

  @Action(UpdateAnnouncement)
  updateAnnouncement(
    ctx: StateContext<AnnouncementsStateModel>,
    { payload: { announcement } }: UpdateAnnouncement
  ) {
    produce(ctx, (draft: AnnouncementsStateModel) => {
      draft.entities[announcement.id] = announcement;
      draft.isSaving = false;
    });
  }
}
