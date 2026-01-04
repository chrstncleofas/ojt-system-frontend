export type TimeLogAction = 'IN' | 'OUT' | 'LUNCH IN' | 'LUNCH OUT';

export interface TimeLog {
  id: string;
  student: string;
  action: TimeLogAction;
  timestamp: string;
  image?: string;
}
