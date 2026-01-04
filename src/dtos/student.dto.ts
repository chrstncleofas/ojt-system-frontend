import { Student } from '../interfaces/student.interface';

export interface StudentRegistrationDTO {
  pendingStudentId: string;
  pendingFirstname: string;
  pendingMiddlename?: string;
  pendingLastname: string;
  pendingPrefix?: string;
  pendingEmail: string;
  pendingAddress: string;
  pendingNumber: string;
  pendingCourse: string;
  pendingYear?: string;
  pendingUsername: string;
  pendingPassword: string;
  nameOfSupervisor?: string;
  hteAddress?: string;
  contactNumber?: string;
  department?: string;
}

export interface StudentProfileUpdateDTO {
  address?: string;
  number?: string;
  nameOfSupervisor?: string;
  hteAddress?: string;
  contactNumber?: string;
  department?: string;
}

export interface StudentResponseDTO extends Student {}
