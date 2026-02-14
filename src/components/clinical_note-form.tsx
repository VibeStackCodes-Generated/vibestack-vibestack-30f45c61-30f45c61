import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { CreateClinicalNoteInput } from '@/types/clinical_note';

interface ClinicalNoteFormProps {
  onSubmit: (data: CreateClinicalNoteInput) => Promise<void>;
  onCancel?: () => void;
  loading?: boolean;
}

export function ClinicalNoteForm({ onSubmit, onCancel, loading }: ClinicalNoteFormProps) {
  const [formData, setFormData] = useState<Partial<CreateClinicalNoteInput>>({});
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await onSubmit(formData as CreateClinicalNoteInput);
      setFormData({});
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="p-3 text-sm text-[hsl(var(--destructive))] bg-[hsl(var(--destructive))]/10 rounded-[var(--radius)]">{error}</div>}
      <div className="space-y-2">
        <Label htmlFor="author_id">author_id</Label>
        <Input id="author_id" type="text" value={(formData["author_id"] as string) ?? ''} onChange={(e) => setFormData(prev => ({ ...prev, ["author_id"]: e.target.value }))} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="note">note</Label>
        <Input id="note" type="text" value={(formData["note"] as string) ?? ''} onChange={(e) => setFormData(prev => ({ ...prev, ["note"]: e.target.value }))} required />
      </div>
      <div className="flex gap-2">
        <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
        {onCancel && <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>}
      </div>
    </form>
  );
}
