export interface Announcement {
  id: string;
  title: string;
  content: string;
  authorId?: string;
  startDate?: string; // ISO
  endDate?: string; // ISO
  createdAt?: string;
}
