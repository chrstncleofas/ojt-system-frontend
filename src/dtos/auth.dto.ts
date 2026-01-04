import { User } from '../interfaces/user.interface';

export interface LoginDTO {
  usernameOrEmail: string;
  password: string;
}

export interface RegisterDTO {
  username: string;
  email: string;
  password: string;
  position?: string;
}

export interface AuthResponseDTO {
  token: string;
  user: User;
}
