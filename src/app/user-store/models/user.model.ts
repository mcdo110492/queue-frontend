export interface UserModel {
  id: number;
  username: string;
  email?: string;
  name: string;
  role: number;
  token?: string;
  image_path: string;
}
