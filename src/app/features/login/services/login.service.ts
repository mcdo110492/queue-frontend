import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "@env/environment";

import { map } from "rxjs/operators";

import { UserStateModel } from "@core/models";

@Injectable()
export class LoginService {
  baseApi: string = environment.baseApi;
  authenticate(credentials: { username: string; password: string }) {
    return this.http
      .post<{ payload: { user: UserStateModel; token: string } }>(
        `${this.baseApi}/api/auth/login`,
        credentials
      )
      .pipe(
        map(result => {
          const { user, token } = result.payload;
          const { id, username, name, role, image_path } = user;
          return { id, username, name, role, image_path, token };
        })
      );
  }
  constructor(private http: HttpClient) {}
}
