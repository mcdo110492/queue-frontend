import { AlertDialogService } from "./alert-dialog/alert-dialog.service";
import { DialogLoaderService } from "./dialog-loader/dialog-loader.service";
import { LaravelEchoService } from "./laravel-echo/laravel-echo.service";
import { NotificationSoundService } from "./notification-sound/notification-sound.service";

export const services: any[] = [
  AlertDialogService,
  DialogLoaderService,
  LaravelEchoService,
  NotificationSoundService
];
