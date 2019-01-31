import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

type SnackPanelType = "success" | "danger" | "warning" | "info";

@Injectable({
  providedIn: "root"
})
export class SnackBarHelperService {
  snackError(status: number) {
    let message: string = "No Message";

    switch (status) {
      case 400:
        message = "Bad Request";
        break;
      case 401:
        message = "You're not allowed here";
        break;
      case 403:
        message = "Stop! Restricted Area";
        break;
      case 404:
        message = "You gone too far";
        break;
      case 422:
        message = "Form data invalid";
        break;
      case 500:
        message = "Unable to connect to the server";
        break;
      default:
        message = "Hi";
        break;
    }

    return this.snackBar.open(message, "OK", {
      horizontalPosition: "left",
      verticalPosition: "top",
      panelClass: ["snack-bar-bg-danger"]
    });
  }

  customSnackBar(message: string, type: SnackPanelType, action?: string) {
    return this.snackBar.open(message, action, {
      horizontalPosition: "left",
      verticalPosition: "top",
      panelClass: [`snack-bar-bg-${type}`]
    });
  }

  authSnackErr(status: number) {
    let message: string;
    switch (status) {
      case 401:
        message = "Account is disabled";
        break;
      case 404:
        message = "Incorrect username or password";
        break;
      default:
        message = "Unable to connect to the server";
        break;
    }
    return this.snackBar.open(message, "OK", {
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: ["snack-bar-bg-danger"]
    });
  }

  constructor(private snackBar: MatSnackBar) {}
}
