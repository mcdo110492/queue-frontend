import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";

import { Observable } from "rxjs";

import { IssueTokenFacadeService } from "@features/issue-token/facades/issue-token-facade.service";
import { DepartmentModel } from "@features/issue-token/models";

@Component({
  selector: "csab-issue-token-view",
  templateUrl: "issue-token-view.html",
  styleUrls: ["./issue-token-view.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IssueTokenViewComponent implements OnInit {
  departments$: Observable<DepartmentModel[]>;

  ngOnInit() {
    this.facade.loadDepartments();
  }

  constructor(private facade: IssueTokenFacadeService) {
    this.departments$ = this.facade.departments$;
  }
}
