export interface ReportFormData {
  victimName: string;
  birthDate: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  description: string;
  isAnonymous: boolean;
  sexualAbuse: string;
  victimVersion: string;
  guardianVersion: string;
  additionalObservations: string;
}

export type UpdateFormData = (data: Partial<ReportFormData>) => void;
