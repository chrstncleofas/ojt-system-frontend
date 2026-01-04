import apiClient from './api';
import { TimeLogDTO, TimeLogResponseDTO, TimeLogsSummaryDTO } from '../dtos/timelog.dto';

export const timelogService = {
  // Clock in/out
  async clockInOut(data: TimeLogDTO): Promise<{ message: string; data: TimeLogResponseDTO }> {
    const response = await apiClient.post('/timelogs/clock', data);
    return response.data;
  },

  // Get time logs with optional date filter
  async getTimeLogs(from?: string, to?: string): Promise<TimeLogsSummaryDTO> {
    const params = new URLSearchParams();
    if (from) params.append('from', from);
    if (to) params.append('to', to);

    const response = await apiClient.get(`/timelogs?${params.toString()}`);
    return response.data.data;
  },

  // Get today's time logs
  async getTodayLogs(): Promise<TimeLogResponseDTO[]> {
    const response = await apiClient.get('/timelogs/today');
    return response.data.data;
  },
};
