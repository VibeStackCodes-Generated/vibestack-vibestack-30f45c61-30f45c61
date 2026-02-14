export interface Patient {
  id: string;
  mrn: string;
  full_name: string;
  attending_physician_id: string;
  admitted_at: string;
  discharged_at: string;
  ward_id: string;
  bed_id: string;
  profile_id: string;
  created_at: string;
  updated_at: string;
}

export type CreatePatientInput = Omit<Patient, 'id' | 'created_at' | 'updated_at'>;
export type UpdatePatientInput = Partial<CreatePatientInput>;
