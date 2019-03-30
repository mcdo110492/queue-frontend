import {
  Component,
  ChangeDetectionStrategy,
  TemplateRef,
  ViewChild
} from "@angular/core";

import { MatDialog } from "@angular/material/dialog";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { IssueTokenFacadeService } from "@features/issue-token/facades/issue-token-facade.service";

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
      this.ticketTypeText = "Would you like to get a priority token";
    } else {
      this.priorityColor = "primary";
      this.ticketTypeText = "Would you like to get a token";
    }

    const dialogRef = this.dialog.open(this.alertIssueDialog, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(isYes => {
      if (isYes) {
        this.facade.getToken(status);
      }
    });
  }

  constructor(
    private dialog: MatDialog,
    private facade: IssueTokenFacadeService
  ) {
    this.isSaving$ = this.facade.isSaving$;
  }
}
