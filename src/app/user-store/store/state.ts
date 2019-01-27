import { UserModel } from "../models";

export interface State {
  credentials: UserModel;
}

export const initialState: State = {
  credentials: {
    username: null,
    name: null,
    role: 0,
    token: null,
    profileImage: "default.jpg"
  }
};
