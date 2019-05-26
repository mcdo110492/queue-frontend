export interface UserManagementModel {
  id: number;
  username: string;
  password: string;
  name: string;
  image_path?: string;
  role: number;
  status: number;
}
