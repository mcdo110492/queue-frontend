import { Component, ChangeDetectionStrategy } from "@angular/core";

import { Observable } from "rxjs";

import { CustomMatTableModel } from "@shared/components/custom-mat-table/models/custom-mat-table.model";

import { TokenListFacadeService } from "@features/token-list/facades/token-list-facade.service";

import { TokenListModel } from "@features/token-list/models";
import { TokenListLocalService } from "@features/token-list/services/local/token-list-local.service";

@Component({
  selector: "csab-token-list-container",
  templateUrl: "./token-list-container.component.html",
  styleUrls: ["./token-list-container.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TokenListContainerComponent {
  datas$: Observable<TokenListModel[]>;
  displayedColumns: string[] = [
    "ticket_number",
    "priority",
    "status",
    "date_issued",
    "date_completed",
    "served_time",
    "department",
    "counter",
    "user"
  ];
  columns: CustomMatTableModel[] = this.service.columns;
  status: any[] = this.service.status;
  searchTerms: string;
  isLoading$: Observable<boolean>;

  onkeyup(ev: string) {
    this.searchTerms = ev;
  }

  changedStatus(status: number) {
    this.facade.loadTokens(status);
  }
  constructor(
    private facade: TokenListFacadeService,
    private service: TokenListLocalService
  ) {
    this.datas$ = this.facade.entities$;
    this.isLoading$ = this.facade.isLoading$;
  }
}
