import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Observable } from "rxjs";
import { AnnouncementModel } from "@features/display-front/models";
import { DisplayFrontFacadeService } from "@features/display-front/facades";

@Component({
  selector: "csab-display-news",
  templateUrl: "./display-news.component.html",
  styleUrls: ["./display-news.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayNewsComponent implements OnInit {
  announcements$: Observable<AnnouncementModel[]>;
  isLoading$: Observable<boolean>;

  ngOnInit() {
    this.facade.loadAnnouncements();
  }

  constructor(private facade: DisplayFrontFacadeService) {
    this.announcements$ = this.facade.anouncements$;
    this.isLoading$ = this.facade.isAnnouncementLoading$;
  }
}
