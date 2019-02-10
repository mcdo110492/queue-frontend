import {
  Component,
  ChangeDetectionStrategy,
  TemplateRef,
  ViewChild
} from "@angular/core";

import { MatDialog } from "@angular/material/dialog";

import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromIssueTokenStoreReducer from "./../../store/reducers/issue-token.reducer";
import * as fromIssueTokenStoreActions from "./../../store/actions/issue-token.actions";
import * as fromIssueTokenStoreSelector from "./../../store/selectors/issue-token.selector";
import { IssueTokenPrintDialogComponent } from "../issue-token-print-dialog/issue-token-print-dialog.component";

@Component({
  selector: "csab-issue-token-form",
  templateUrl: "./issue-token-form.component.html",
  styleUrls: ["./issue-token-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IssueTokenFormComponent {
  isSaving$: Observable<boolean>;
  priorityColor: string = "primary";
  ticketTypeText: string = "Would you like to get a ticket";
  @ViewChild("alertIssueDialog") alertIssueDialog: TemplateRef<any>;
  generateTicket(status: number) {
    if (status === 1) {
      this.priorityColor = "accent";
      this.ticketTypeText = "Would you like to get a priority ticket";
    } else {
      this.priorityColor = "primary";
      this.ticketTypeText = "Would you like to get a ticket";
    }

    const dialogRef = this.dialog.open(this.alertIssueDialog, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(isYes => {
      if (isYes) {
        const payload = { priority: status };
        this.store.dispatch(
          new fromIssueTokenStoreActions.GetIssueToken(payload)
        );
      }
    });
  }

  constructor(
    private dialog: MatDialog,
    private store: Store<fromIssueTokenStoreReducer.State>
  ) {
    this.isSaving$ = this.store.select(
      fromIssueTokenStoreSelector.selectIssueTokenIsSaving
    );
  }
}
