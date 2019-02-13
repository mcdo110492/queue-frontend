import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { Store } from "@ngrx/store";
import * as fromStoreMediaAction from "./../../store/actions/media-display.action";
import * as fromStoreMediaReducer from "./../../store/reducers/media-display.reducer";
import * as fromStoreMediaSelectors from "./../../store/selectors/media-display.select";

import { IMediaModel } from "@features/queue-front-display/models";
import { Observable } from "rxjs";

@Component({
  selector: "csab-queue-slideshow",
  templateUrl: "./queue-slideshow.component.html",
  styleUrls: ["./queue-slideshow.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QueueSlideshowComponent implements OnInit {
  playlists$: Observable<IMediaModel[]>;
  playListCount$: Observable<number>;

  constructor(private store: Store<fromStoreMediaReducer.State>) {
    this.playlists$ = this.store.select(fromStoreMediaSelectors.selectAllMedia);
    this.playListCount$ = this.store.select(
      fromStoreMediaSelectors.selectMediaTotal
    );
  }

  ngOnInit() {
    this.store.dispatch(new fromStoreMediaAction.LoadMedia());
  }
}
