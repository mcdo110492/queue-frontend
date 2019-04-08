import { TokenModel } from "../models";

export class IsTokenLoading {
  static readonly type = "[Token] Is Token Loading";
  constructor(public payload: boolean) {}
}

export class AddTokens {
  static readonly type = "[Token] Add Tokens";
  constructor(
    public payload: {
      tokens: TokenModel[];
    }
  ) {}
}

export class AddToken {
  static readonly type = "[Token] Add Token";
  constructor(public payload: { token: TokenModel }) {}
}

export class RemoveIdToken {
  static readonly type = "[Token] Remove Id Token";
  constructor(public id: number) {}
}

export class AddIdToken {
  static readonly type = "[Token] Add Id Token";
  constructor(public id: number) {}
}

export class CallToken {
  static readonly type = "[Token] Call Token";
  constructor(public payload: { id: number; priority: number }) {}
}

export class NowServing {
  static readonly type = "[Token] Now Serving";
  constructor(public id: number) {}
}

export class CallNextToken {
  static readonly type = "[Token] Call Next Token";
}

export class CallAgainToken {
  static readonly type = "[Token] Call Again Token";
  constructor(public id: number) {}
}

export class ServeToken {
  static readonly type = "[Token] Serve Token";
  constructor(public id: number) {}
}

export class FinishToken {
  static readonly type = "[Token] Finish Token";
  constructor(public id: number) {}
}

export class StopToken {
  static readonly type = "[Token] Stop Token";
  constructor(public id: number) {}
}

export class BackToQueueToken {
  static readonly type = "[Token] Back To Queue Token";
  constructor(public payload: { id: number; priority: number }) {}
}

export class LastUserTransaction {
  static readonly type = "[Token] Last User Trasanction";
  constructor(public payload: { token: TokenModel; status: number }) {}
}

export class OnServerError {
  static readonly type = "[Token] On Server Error";
  constructor(public statusCode: number) {}
}

export class OnServerSuccess {
  static readonly type = "[Token] On Server Success";
  constructor(public payload: any) {}
}
