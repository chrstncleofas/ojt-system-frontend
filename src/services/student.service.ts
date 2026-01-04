import apiClient from './api';
import { Student } from '../interfaces/student.interface';
import {
  StudentRegistrationDTO,
  StudentProfileUpdateDTO,
  StudentResponseDTO,
} from '../dtos/student.dto';

export const studentService = {
  // Student registration (public)
  async register(data: StudentRegistrationDTO): Promise<{ message: string }> {
    const response = await apiClient.post('/students/register', data);
    return response.data;
  },

  // Get student profile
  async getProfile(): Promise<StudentResponseDTO> {
    const response = await apiClient.get('/students/profile');
    return response.data.data;
  },

  // Update student profile
  async updateProfile(data: StudentProfileUpdateDTO): Promise<StudentResponseDTO> {
    const response = await apiClient.put('/students/profile', data);
    return response.data.data;
  },

  // Admin/coordinator methods
  async getAll(): Promise<Student[]> {
    const response = await apiClient.get('/students');
    return response.data;
  },

  async getById(id: string): Promise<Student> {
    const response = await apiClient.get(`/students/${id}`);
    return response.data;
  },

  async create(data: Partial<Student>): Promise<Student> {
    const response = await apiClient.post('/students', data);
    return response.data;
  },

  async update(id: string, data: Partial<Student>): Promise<Student> {
    const response = await apiClient.put(`/students/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/students/${id}`);
  },
};
