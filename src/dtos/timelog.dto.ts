import { TimeLogAction } from '../interfaces/timelog.interface';

export interface TimeLogDTO {
  action: TimeLogAction;
  image?: string;
}

export interface TimeLogResponseDTO {
  id: string;
  student: string;
  action: TimeLogAction;
  timestamp: string;
  image?: string;
}

export interface TimeLogsSummaryDTO {
  logs: TimeLogResponseDTO[];
  totalHours: number;
  totalMinutes: number;
  requiredHours: number;
  remainingHours: number;
  remainingMinutes: number;
}
