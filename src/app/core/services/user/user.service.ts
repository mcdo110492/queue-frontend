import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "@env/environment";

import { map } from "rxjs/operators";

import { UserStateModel } from "@core/models";

@Injectable({
  providedIn: "root"
})
export class UserService {
  authenticate(credentials: { username: string; password: string }) {
    return this.http
      .post<{ payload: { user: UserStateModel; token: string } }>(
        `${environment.baseApi}/auth/login`,
        credentials
      )
      .pipe(
        map(result => {
          const { user, token } = result.payload;
          const { id, username, name, role, image_path, department_id } = user;
          return { id, username, name, role, image_path, token, department_id };
        })
      );
  }

  backendRouteGuard() {
    //if success returns http status of 200 with payload "OK" otherwise 402,403,404
    return this.http.post(
      `${environment.baseApi}/auth/client/route/guard`,
      null
    );
  }

  backEndLogout() {
    return this.http.post(`${environment.baseApi}/auth/logout`, null);
  }

  constructor(private http: HttpClient) {}
}
