import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "@env/environment";
import { Observable } from "rxjs";
import { IssueTokenModel } from "@features/issue-token/models";
import { MatDialog } from "@angular/material/dialog";
import { IssueTokenPrintDialogComponent } from "@features/issue-token/components/issue-token-print-dialog/issue-token-print-dialog.component";

interface IssueTokenDataModel {
  priority: number;
}

interface IssueTokenResponseModel {
  payload: IssueTokenModel;
}

@Injectable()
export class IssueTokenApiService {
  private baseApi: string = environment.baseApi;

  generateToken(
    data: IssueTokenDataModel
  ): Observable<IssueTokenResponseModel> {
    return this.http.post<IssueTokenResponseModel>(
      `${this.baseApi}/tickets/generate`,
      data
    );
  }

  openPrintDialog() {
    this.dialog.open(IssueTokenPrintDialogComponent, {
      id: "print-issue-token-dialog",
      width: "384px",
      height: "288px",
      hasBackdrop: false
    });
  }

  constructor(private http: HttpClient, private dialog: MatDialog) {}
}
