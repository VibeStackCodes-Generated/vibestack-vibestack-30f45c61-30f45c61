export interface Ward {
  id: string;
  name: string;
  floor: string;
  created_at: string;
  updated_at: string;
}

export type CreateWardInput = Omit<Ward, 'id' | 'created_at' | 'updated_at'>;
export type UpdateWardInput = Partial<CreateWardInput>;
