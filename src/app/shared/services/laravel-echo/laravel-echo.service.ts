import { Injectable } from "@angular/core";

import Echo from "laravel-echo";

import { environment } from "@env/environment";

declare global {
  interface Window {
    LEcho: any;
  }
}

window.LEcho = window.LEcho || {};

@Injectable()
export class LaravelEchoService {
  isAuthenticated: boolean = false;
  authLaravelEcho(token: string) {
    const options: any = {
      broadcaster: "pusher",
      key: environment.pusher.key,
      cluster: environment.pusher.cluster,
      authEndpoint: environment.pusher.authEndpoint,
      wsHost: window.location.hostname,
      wsPort: 6001,
      auth: {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        }
      }
    };
    if (!this.isAuthenticated) {
      window.LEcho = new Echo(options);
    }

    this.isAuthenticated = true;
  }
}
