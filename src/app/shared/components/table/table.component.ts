import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  OnChanges,
  Output,
  EventEmitter
} from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";

import { TableColumn } from "@shared/models/table.model";

@Component({
  selector: "csab-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit, OnChanges {
  @Input() displayedColumns: string[];
  @Input() columns: TableColumn[];
  @Input() data: any[];
  @Input() searchTerms: string;
  @Input() isLoading: boolean = false;
  @Output("update") tblBtnClick = new EventEmitter<any>();
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnChanges() {
    this.dataSource.data = this.data;
    this.dataSource.filter = this.searchTerms;
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filter = this.searchTerms;
  }

  btnClick(id: number | string) {
    this.tblBtnClick.emit(id);
  }
}
