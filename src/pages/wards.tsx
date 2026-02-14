import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWards } from '@/hooks/use-wards';
import { WardForm } from '@/components/ward-form';
import { WardList } from '@/components/ward-list';
import type { CreateWardInput } from '@/types/ward';

export default function WardsPage() {
  const { items, loading, create, remove } = useWards();
  const [showForm, setShowForm] = useState(false);

  const handleCreate = async (data: CreateWardInput) => {
    await create(data);
    setShowForm(false);
  };

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Wards</h1>
        <Button onClick={() => setShowForm(!showForm)}><Plus className="h-4 w-4 mr-2" />Add Ward</Button>
      </div>
      {showForm && (
        <div className="mb-8 p-6 border rounded-[var(--radius)]">
          <h2 className="text-lg font-semibold mb-4">New Ward</h2>
          <WardForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
        </div>
      )}
      {loading ? (
        <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[hsl(var(--primary))]" /></div>
      ) : (
        <WardList items={items} onDelete={remove} />
      )}
    </div>
  );
}
