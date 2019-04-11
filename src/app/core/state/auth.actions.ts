import { UserStateModel } from "@core/models";

export class AuthenticateSuccess {
  static readonly type = "[Auth] Authenticate Credentials";
  constructor(public payload: { user: UserStateModel }) {}
}

export class IsAuthenticating {
  static readonly type = "[Auth] Is Authenticating";
  constructor(public payload: boolean) {}
}

export class AuthFailed {
  static readonly type = "[Auth] Authentication Failed";
  constructor(public errStatus: number) {}
}

export class Logout {
  static readonly type = "[Auth] Logout Credentials";
}

export class RevertToDefaultUser {
  static readonly type = "[Auth] Revert To Defualt User";
}

export class AddSocketId {
  static readonly type = "[Auth] Add Socket Id";
  constructor(public id: string | null) {}
}
