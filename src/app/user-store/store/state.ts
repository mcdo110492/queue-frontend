import { UserModel } from "../models";

export interface State {
  isLoading: boolean;
  credentials: UserModel;
}

export const initialState: State = {
  isLoading: false,
  credentials: {
    id: 0,
    username: null,
    name: null,
    role: 0,
    token: null,
    image_path: "default.jpg"
  }
};
