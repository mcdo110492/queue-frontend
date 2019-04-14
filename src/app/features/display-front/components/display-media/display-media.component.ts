import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { Observable } from "rxjs";

import { MediaModel } from "@features/display-front/models/media.model";
import { DisplayFrontFacadeService } from "@features/display-front/facades";

@Component({
  selector: "csab-display-media",
  templateUrl: "./display-media.component.html",
  styleUrls: ["./display-media.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayMediaComponent implements OnInit {
  sources$: Observable<MediaModel[]>;
  isLoading$: Observable<boolean>;

  ngOnInit() {
    this.facade.loadMedia();
  }

  constructor(private facade: DisplayFrontFacadeService) {
    this.sources$ = this.facade.medias$;
    this.isLoading$ = this.facade.isMediaLoading$;
  }
}
