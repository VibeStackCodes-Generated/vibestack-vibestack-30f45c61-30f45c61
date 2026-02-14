import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { CreateWardInput } from '@/types/ward';

interface WardFormProps {
  onSubmit: (data: CreateWardInput) => Promise<void>;
  onCancel?: () => void;
  loading?: boolean;
}

export function WardForm({ onSubmit, onCancel, loading }: WardFormProps) {
  const [formData, setFormData] = useState<Partial<CreateWardInput>>({});
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await onSubmit(formData as CreateWardInput);
      setFormData({});
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="p-3 text-sm text-[hsl(var(--destructive))] bg-[hsl(var(--destructive))]/10 rounded-[var(--radius)]">{error}</div>}
      <div className="space-y-2">
        <Label htmlFor="name">name</Label>
        <Input id="name" type="text" value={(formData["name"] as string) ?? ''} onChange={(e) => setFormData(prev => ({ ...prev, ["name"]: e.target.value }))} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="floor">floor</Label>
        <Input id="floor" type="text" value={(formData["floor"] as string) ?? ''} onChange={(e) => setFormData(prev => ({ ...prev, ["floor"]: e.target.value }))}  />
      </div>
      <div className="flex gap-2">
        <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
        {onCancel && <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>}
      </div>
    </form>
  );
}
