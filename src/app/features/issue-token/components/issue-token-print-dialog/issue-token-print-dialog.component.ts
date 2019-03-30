import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";

import { MatDialogRef } from "@angular/material/dialog";

import { Observable } from "rxjs";

import { IssueTokenModel } from "@features/issue-token/models";

import { Select } from "@ngxs/store";
import { IssueTokenState } from "@features/issue-token/state/issue-token.state";

@Component({
  selector: "csab-issue-token-print-dialog",
  templateUrl: "./issue-token-print-dialog.component.html",
  styleUrls: ["./issue-token-print-dialog.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IssueTokenPrintDialogComponent implements OnInit {
  @Select(IssueTokenState.generatedToken) issueTokenData$: Observable<
    IssueTokenModel
  >;

  ngOnInit() {
    setTimeout(() => {
      window.print();
      this.dialogRef.close();
    }, 150);
  }

  constructor(
    private dialogRef: MatDialogRef<IssueTokenPrintDialogComponent>
  ) {}
}
