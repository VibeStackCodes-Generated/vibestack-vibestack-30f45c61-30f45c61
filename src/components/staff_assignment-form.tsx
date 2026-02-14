import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { CreateStaffAssignmentInput } from '@/types/staff_assignment';

interface StaffAssignmentFormProps {
  onSubmit: (data: CreateStaffAssignmentInput) => Promise<void>;
  onCancel?: () => void;
  loading?: boolean;
}

export function StaffAssignmentForm({ onSubmit, onCancel, loading }: StaffAssignmentFormProps) {
  const [formData, setFormData] = useState<Partial<CreateStaffAssignmentInput>>({});
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await onSubmit(formData as CreateStaffAssignmentInput);
      setFormData({});
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="p-3 text-sm text-[hsl(var(--destructive))] bg-[hsl(var(--destructive))]/10 rounded-[var(--radius)]">{error}</div>}
      <div className="space-y-2">
        <Label htmlFor="user_id">user_id</Label>
        <Input id="user_id" type="text" value={(formData["user_id"] as string) ?? ''} onChange={(e) => setFormData(prev => ({ ...prev, ["user_id"]: e.target.value }))} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="active">active</Label>
        <input id="active" type="checkbox" checked={!!formData["active"]} onChange={(e) => setFormData(prev => ({ ...prev, ["active"]: e.target.checked }))} className="h-4 w-4" />
      </div>
      <div className="flex gap-2">
        <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
        {onCancel && <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>}
      </div>
    </form>
  );
}
