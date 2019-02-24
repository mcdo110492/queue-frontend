import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

type SnackBarPanel = "success" | "danger" | "warning" | "info";

@Injectable({
  providedIn: "root"
})
export class SnackBarService {
  authSnackBarError(status: number) {
    let message: string = "";

    switch (status) {
      case 401:
        message = "Account is disabled";
        break;
      case 404:
        message = "Incorrect username or password";
        break;
      default:
        message = "Something went wrong!";
        break;
    }

    return this.snackBar.open(message, "OK", {
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: ["snack-bar-bg-danger"]
    });
  }

  customSnackBar(type: SnackBarPanel, message: string, action?: string) {
    return this.snackBar.open(message, action, {
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: [`snack-bar-bg-${type}`]
    });
  }

  globalSnackBarError(status: number) {
    let message: string;

    switch (status) {
      case 400:
        message = "You send something anoying!";
        break;
      case 401:
        message = "Go Back!";
        break;
      case 403:
        message = "Stop! Restricted Area!";
        break;
      case 404:
        message = "I think you' re lost!";
        break;
      case 422:
        message = "You' re data is not valid!";
        break;
      default:
        message = "Something went wrong!";
        break;
    }

    return this.snackBar.open(message, "OK", {
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: ["snack-bar-bg-danger"]
    });
  }

  constructor(private snackBar: MatSnackBar) {}
}
