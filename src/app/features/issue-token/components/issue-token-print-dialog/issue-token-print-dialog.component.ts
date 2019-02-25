import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";

import { MatDialogRef } from "@angular/material/dialog";

import { Observable } from "rxjs";

import { Store } from "@ngrx/store";
import * as fromStoreIssueTokenReducer from "@features/issue-token/state/reducers/issue-token.reducer";
import * as fromStoreIssueTokenSelector from "@features/issue-token/state/selectors/issue-token.selector";

import { IssueTokenModel } from "@features/issue-token/models";

@Component({
  selector: "csab-issue-token-print-dialog",
  templateUrl: "./issue-token-print-dialog.component.html",
  styleUrls: ["./issue-token-print-dialog.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IssueTokenPrintDialogComponent implements OnInit {
  issueTokenData$: Observable<IssueTokenModel>;

  ngOnInit() {
    setTimeout(() => {
      window.print();
      this.dialogRef.close();
    }, 150);
  }

  constructor(
    private store: Store<fromStoreIssueTokenReducer.State>,
    private dialogRef: MatDialogRef<IssueTokenPrintDialogComponent>
  ) {
    this.issueTokenData$ = this.store.select(
      fromStoreIssueTokenSelector.selectLastGeneratedIssueToken
    );
  }
}
