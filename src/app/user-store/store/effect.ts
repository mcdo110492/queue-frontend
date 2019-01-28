import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { ActionTypes, Authenticate, AddUserCredentials } from "./action";
import { UserService } from "@user-store/services/user.service";
import { switchMap, map, catchError } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

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
          if (error.status == 401) {
            alert("Incorrect username or password");
          }

          this.snakBar.open("Incorrect username or password", "ok", {
            horizontalPosition: "center",
            verticalPosition: "top",
            panelClass: ["snack-bar-bg-info"]
          });

          console.log(error);
          return of();
        })
      );
    })
  );

  constructor(
    private actions$: Actions,
    private service: UserService,
    private snakBar: MatSnackBar
  ) {}
}
