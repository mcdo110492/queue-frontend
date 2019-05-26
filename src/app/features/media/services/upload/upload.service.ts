import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpRequest,
  HttpEventType,
  HttpResponse
} from "@angular/common/http";

import { Observable, Subject } from "rxjs";
import { environment } from "@env/environment";

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

      this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round((100 * event.loaded) / event.total);

          progress.next(percentDone);
        } else if (event instanceof HttpResponse) {
          progress.complete();
        }
      });

      status[file.name] = {
        progress: progress.asObservable()
      };
    });
    return status;
  }
  constructor(private http: HttpClient) {}
}
