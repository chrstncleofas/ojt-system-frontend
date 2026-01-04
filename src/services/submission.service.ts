import apiClient from './api';
import {
  SubmitRequirementDTO,
  SubmittedRequirementDTO,
  AvailableRequirementDTO,
} from '../dtos/submission.dto';

export const submissionService = {
  // Submit a requirement
  async submitRequirement(
    data: SubmitRequirementDTO,
    file?: File
  ): Promise<{ message: string; data: SubmittedRequirementDTO }> {
    const formData = new FormData();
    formData.append('nameOfDocs', data.nameOfDocs);
    if (file) {
      formData.append('submitted_file', file);
    }

    const response = await apiClient.post('/submissions', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Get submitted requirements for current student
  async getSubmittedRequirements(): Promise<SubmittedRequirementDTO[]> {
    const response = await apiClient.get('/submissions');
    return response.data.data;
  },

  // Get available requirements to submit
  async getAvailableRequirements(): Promise<AvailableRequirementDTO[]> {
    const response = await apiClient.get('/submissions/available');
    return response.data.data;
  },
};
