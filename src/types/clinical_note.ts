export interface ClinicalNote {
  id: string;
  author_id: string;
  note: string;
  patient_id: string;
  profile_id: string;
  created_at: string;
  updated_at: string;
}

export type CreateClinicalNoteInput = Omit<ClinicalNote, 'id' | 'created_at' | 'updated_at'>;
export type UpdateClinicalNoteInput = Partial<CreateClinicalNoteInput>;
