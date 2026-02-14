export interface StaffAssignment {
  id: string;
  user_id: string;
  active: boolean;
  profile_id: string;
  ward_id: string;
  created_at: string;
  updated_at: string;
}

export type CreateStaffAssignmentInput = Omit<StaffAssignment, 'id' | 'created_at' | 'updated_at'>;
export type UpdateStaffAssignmentInput = Partial<CreateStaffAssignmentInput>;
