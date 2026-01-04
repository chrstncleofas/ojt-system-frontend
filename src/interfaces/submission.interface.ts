export interface SubmittedRequirement {
  id: string;
  nameOfDocs: string;
  student: string;
  submitted_file: string;
  submission_date: string;
  due_date: string;
}

export interface AvailableRequirement {
  id: string;
  nameOfFile: string;
  document: string;
  upload_date: string;
}
