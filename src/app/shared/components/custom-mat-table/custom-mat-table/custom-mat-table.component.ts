import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ChangeDetectionStrategy,
  ViewChild
} from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";

import { CustomMatTableModel } from "./../models/custom-mat-table.model";

@Component({
  selector: "csab-custom-mat-table",
  templateUrl: "./custom-mat-table.component.html",
  styleUrls: ["./custom-mat-table.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomMatTableComponent implements OnInit, OnChanges {
  @Input() displayedColumns: string[];
  @Input() columns: CustomMatTableModel[];
  @Input() data: any[];
  @Input() searchTerms: string = "";
  @Input() isLoading: boolean = false;
  @Output() btnClick = new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource();

  ngOnChanges() {
    this.dataSource.data = this.data;
    this.dataSource.filter = this.searchTerms;
  }

  ngOnInit() {
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

  click(id: number | string) {
    this.btnClick.emit(id);
  }
}
