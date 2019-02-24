import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { Observable } from "rxjs";

import { Store } from "@ngrx/store";
import * as fromMediaReducer from "@features/display-front/state/reducers/media.reducer";
import * as fromMediaSelectors from "@features/display-front/state/selectors/media.selectors";
import * as fromMediaActions from "@features/display-front/state/actions/media.actions";

import { MediaModel } from "@features/display-front/models/media.model";

@Component({
  selector: "csab-display-media",
  templateUrl: "./display-media.component.html",
  styleUrls: ["./display-media.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayMediaComponent implements OnInit {
  sources$: Observable<MediaModel[]>;
  isLoading$: Observable<boolean>;
  isLoaded$: Observable<boolean>;

  ngOnInit() {
    this.store.dispatch(new fromMediaActions.LoadMedias());
  }

  constructor(private store: Store<fromMediaReducer.State>) {
    this.isLoading$ = this.store.select(fromMediaSelectors.selectIsLoading);
    this.isLoaded$ = this.store.select(fromMediaSelectors.selectIsLoaded);
    this.sources$ = this.store.select(fromMediaSelectors.selectSources);
  }
}
