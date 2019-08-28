import {
  Component,
  ChangeDetectionStrategy,
  TemplateRef,
  ViewChild
} from "@angular/core";

import { MatDialog } from "@angular/material/dialog";

import { Observable } from "rxjs";

import { IssueTokenFacadeService } from "@features/issue-token/facades/issue-token-facade.service";

@Component({
  selector: "csab-issue-token-form",
  templateUrl: "./issue-token-form.component.html",
  styleUrls: ["./issue-token-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IssueTokenFormComponent {
  isSaving$: Observable<boolean>;
  routerParams$: Observable<any>;
  priorityColor: string = "primary";
  ticketTypeText: string = "GET YOUR TOKEN NUMBER";

  @ViewChild("alertIssueDialog") alertIssueDialog: TemplateRef<any>;

  generateTicket(status: number) {
    if (status === 1) {
      this.priorityColor = "accent";
      this.ticketTypeText =
        "GET YOUR PRIORITY TOKEN NUMBER";
    } else {
      this.priorityColor = "primary";
      this.ticketTypeText = "GET YOUR REGULAR TOKEN NUMBER";
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
    this.routerParams$ = this.facade.routerParams$;
  }
}
