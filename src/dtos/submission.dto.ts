export interface SubmitRequirementDTO {
  nameOfDocs: string;
}

export interface SubmittedRequirementDTO {
  id: string;
  nameOfDocs: string;
  student: string;
  submitted_file: string;
  submission_date: string;
  due_date: string;
}

export interface AvailableRequirementDTO {
  id: string;
  nameOfFile: string;
  document: string;
  upload_date: string;
}
