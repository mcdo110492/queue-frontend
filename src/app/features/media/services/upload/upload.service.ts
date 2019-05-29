import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpRequest,
  HttpEventType,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";

import { Observable, Subject } from "rxjs";
import { environment } from "@env/environment";
import { SnackBarService } from "@core/services/snack-bar/snack-bar.service";
import { MatDialog } from "@angular/material";

@Injectable()
export class UploadService {
  private url: string = `${environment.baseApi}/media/files`;
  upload(
    files: Set<File>
  ): { [key: string]: { progress: Observable<number> } } {
    const status: { [key: string]: { progress: Observable<number> } } = {};

    files.forEach(file => {
      const formData = new FormData();
      formData.append("medias", file);

      const req = new HttpRequest("POST", this.url, formData, {
        reportProgress: true
      });

      const progress = new Subject<number>();

      this.http.request(req).subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round((100 * event.loaded) / event.total);

          progress.next(percentDone);
        } else if (event instanceof HttpResponse) {
          progress.complete();
        }

        if (event.status === 422) {
          this.snack.customSnackBar(
            "info",
            "Error uploading your file(s). Make sure you have a correct file format"
          );
          this.dialog.getDialogById("file-upload-dialog").close();
        }
      });

      status[file.name] = {
        progress: progress.asObservable()
      };
    });
    return status;
  }
  constructor(
    private http: HttpClient,
    private snack: SnackBarService,
    private dialog: MatDialog
  ) {}
}
