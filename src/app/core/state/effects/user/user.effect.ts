import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";

import { Observable, of } from "rxjs";
import { switchMap, map, catchError, tap } from "rxjs/operators";

import { UserService } from "@core/services/user/user.service";
import { SnackBarService } from "@core/services/snack-bar/snack-bar.service";

import {
  ActionTypes,
  Authenticate,
  AddUserCredentials,
  RemoveUserCredentials
} from "../../actions/user.action";

@Injectable()
export class UserEffects {
  @Effect()
  authenticate$: Observable<any> = this.actions$.pipe(
    ofType(ActionTypes.AUTHENTICATE),
    map((action: Authenticate) => action.payload),
    switchMap(credentials => {
      return this.userService.authenticate(credentials).pipe(
        map(user => new AddUserCredentials(user)),
        catchError(error => {
          this.snackService.authSnackBarError(error.status);
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
    ofType(ActionTypes.LOGOUT),
    switchMap(() => {
      return this.userService.backEndLogout().pipe(
        map(() => new RemoveUserCredentials()),
        catchError(error => {
          this.snackService.authSnackBarError(error.status);
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
    private userService: UserService,
    private snackService: SnackBarService,
    private router: Router
  ) {}
}
