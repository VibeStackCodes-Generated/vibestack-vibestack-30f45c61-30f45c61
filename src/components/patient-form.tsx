import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { CreatePatientInput } from '@/types/patient';

interface PatientFormProps {
  onSubmit: (data: CreatePatientInput) => Promise<void>;
  onCancel?: () => void;
  loading?: boolean;
}

export function PatientForm({ onSubmit, onCancel, loading }: PatientFormProps) {
  const [formData, setFormData] = useState<Partial<CreatePatientInput>>({});
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await onSubmit(formData as CreatePatientInput);
      setFormData({});
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="p-3 text-sm text-[hsl(var(--destructive))] bg-[hsl(var(--destructive))]/10 rounded-[var(--radius)]">{error}</div>}
      <div className="space-y-2">
        <Label htmlFor="mrn">mrn</Label>
        <Input id="mrn" type="text" value={(formData["mrn"] as string) ?? ''} onChange={(e) => setFormData(prev => ({ ...prev, ["mrn"]: e.target.value }))} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="full_name">full_name</Label>
        <Input id="full_name" type="text" value={(formData["full_name"] as string) ?? ''} onChange={(e) => setFormData(prev => ({ ...prev, ["full_name"]: e.target.value }))} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="attending_physician_id">attending_physician_id</Label>
        <Input id="attending_physician_id" type="text" value={(formData["attending_physician_id"] as string) ?? ''} onChange={(e) => setFormData(prev => ({ ...prev, ["attending_physician_id"]: e.target.value }))} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="admitted_at">admitted_at</Label>
        <Input id="admitted_at" type="text" value={(formData["admitted_at"] as string) ?? ''} onChange={(e) => setFormData(prev => ({ ...prev, ["admitted_at"]: e.target.value }))} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="discharged_at">discharged_at</Label>
        <Input id="discharged_at" type="text" value={(formData["discharged_at"] as string) ?? ''} onChange={(e) => setFormData(prev => ({ ...prev, ["discharged_at"]: e.target.value }))}  />
      </div>
      <div className="flex gap-2">
        <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
        {onCancel && <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>}
      </div>
    </form>
  );
}
