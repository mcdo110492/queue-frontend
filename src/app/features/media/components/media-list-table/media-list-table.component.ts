import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  ChangeDetectionStrategy
} from "@angular/core";

import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource, MatDialog } from "@angular/material";

import { Subscription, Observable } from "rxjs";

import { MediaModel } from "@features/media/models/media.model";
import { MediaFacadeService } from "@features/media/facades/media-facade.service";

import { MediaViewModalComponent } from "./../media-view-modal/media-view-modal.component";

@Component({
  selector: "csab-media-list-table",
  templateUrl: "./media-list-table.component.html",
  styleUrls: ["./media-list-table.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaListTableComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  isLoading$: Observable<boolean>;
  displayedColumns: string[] = [
    "id",
    "title",
    "media_type",
    "weight",
    "visibility",
    "source",
    "actions"
  ];
  dataSource: MatTableDataSource<MediaModel> = new MatTableDataSource();
  searchTerms: string = "";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.subscription = this.facade.entities$.subscribe(
      (medias: MediaModel[]) => {
        this.dataSource.data = medias;
      }
    );

    const nestedFilterCheck = (search, data, key) => {
      if (typeof data[key] === "object") {
        for (const k in data[key]) {
          if (data[key][k] !== null) {
            search = nestedFilterCheck(search, data[key], k);
          }
        }
      } else {
        search += data[key];
      }
      return search;
    };

    this.dataSource.filterPredicate = (data: any, filter: string): boolean => {
      const accumulator = (currentTerm, key) => {
        return nestedFilterCheck(currentTerm, data, key);
      };
      const dataStr = Object.keys(data)
        .reduce(accumulator, "")
        .toLowerCase();
      // Transform the filter by converting it to lowercase and removing whitespace.
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    };

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  search(ev: any) {
    this.dataSource.filter = ev;
  }

  viewMedia(model: MediaModel) {
    const dialog = this.dialog.open(MediaViewModalComponent, {
      id: "media-view-player-modal",
      width: "auto",
      data: model
    });
  }

  constructor(private facade: MediaFacadeService, private dialog: MatDialog) {
    this.isLoading$ = this.facade.isLoading$;
    this.facade.loadMedias();
  }
}
