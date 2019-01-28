import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@env/environment";
import { map } from "rxjs/operators";
import { UserModel } from "@user-store/models";

@Injectable({
  providedIn: "root"
})
export class UserService {
  baseApi: string = environment.baseApi;
  authenticate(credentials: { username: string; password: string }) {
    return this.http
      .post<{ payload: { user: UserModel; token: string } }>(
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

  logout() {
    return this.http.post(`${this.baseApi}/api/auth/logout`, []);
  }
  constructor(private http: HttpClient) {}
}
