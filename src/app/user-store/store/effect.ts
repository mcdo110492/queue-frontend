import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import {
  ActionTypes,
  Authenticate,
  AddUserCredentials,
  RemoveUserCredentials
} from "./action";
import { UserService } from "@user-store/services/user.service";
import { switchMap, map, catchError, tap } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { SnackBarHelperService } from "@helpers/snack-bar-helper/snack-bar-helper.service";
import { Router } from "@angular/router";

@Injectable()
export class UserEffects {
  @Effect()
  authenticate$: Observable<any> = this.actions$.pipe(
    ofType(ActionTypes.AUTHENTICATE),
    map((action: Authenticate) => action.payload),
    switchMap(credentials => {
      return this.service.authenticate(credentials).pipe(
        map(user => new AddUserCredentials(user)),
        catchError(error => {
          this.snackHelper.authSnackErr(error.status);
          return of();
        })
      );
    })
  );

  @Effect({ dispatch: false })
  addNewUserCredentials$: Observable<any> = this.actions$.pipe(
    ofType(ActionTypes.ADD_USER_CREDENTIALS),
    tap(() => {
      this.router.navigate(["/app"]);
    })
  );

  @Effect()
  logout$: Observable<any> = this.actions$.pipe(
    ofType(ActionTypes.LOG_OUT),
    switchMap(() => {
      return this.service.logout().pipe(
        map(() => new RemoveUserCredentials()),
        catchError(error => {
          this.snackHelper.authSnackErr(error.status);
          return of();
        })
      );
    })
  );

  @Effect({ dispatch: false })
  removeUserCredentials: Observable<any> = this.actions$.pipe(
    ofType(ActionTypes.REMOVE_USER_CREDENTIALS),
    map(() => {
      this.router.navigate(["/login"]);
    })
  );

  constructor(
    private actions$: Actions,
    private service: UserService,
    private snackHelper: SnackBarHelperService,
    private router: Router
  ) {}
}
