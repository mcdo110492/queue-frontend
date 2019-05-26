export interface UserStateModel {
  id: number;
  username: string;
  name: string;
  role: number;
  token?: string;
  image_path: string | null;
  department_id?: number;
}
