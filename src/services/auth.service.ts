import apiClient from './api';
import { LoginDTO, RegisterDTO, AuthResponseDTO } from '../dtos/auth.dto';

export const authService = {
  async login(credentials: LoginDTO): Promise<AuthResponseDTO> {
    const response = await apiClient.post<AuthResponseDTO>('/auth/login', credentials);
    return response.data;
  },

  async register(data: RegisterDTO): Promise<AuthResponseDTO> {
    const response = await apiClient.post<AuthResponseDTO>('/auth/register', data);
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },
};
