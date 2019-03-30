export class Authenticate {
  static readonly type = "[Auth] Authenticate Credentials";
  constructor(public payload: { username: string; password: string }) {}
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
