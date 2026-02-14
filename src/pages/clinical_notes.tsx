import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useClinicalNotes } from '@/hooks/use-clinical_notes';
import { ClinicalNoteForm } from '@/components/clinical_note-form';
import { ClinicalNoteList } from '@/components/clinical_note-list';
import type { CreateClinicalNoteInput } from '@/types/clinical_note';

export default function ClinicalNotesPage() {
  const { items, loading, create, remove } = useClinicalNotes();
  const [showForm, setShowForm] = useState(false);

  const handleCreate = async (data: CreateClinicalNoteInput) => {
    await create(data);
    setShowForm(false);
  };

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">ClinicalNotes</h1>
        <Button onClick={() => setShowForm(!showForm)}><Plus className="h-4 w-4 mr-2" />Add ClinicalNote</Button>
      </div>
      {showForm && (
        <div className="mb-8 p-6 border rounded-[var(--radius)]">
          <h2 className="text-lg font-semibold mb-4">New ClinicalNote</h2>
          <ClinicalNoteForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
        </div>
      )}
      {loading ? (
        <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[hsl(var(--primary))]" /></div>
      ) : (
        <ClinicalNoteList items={items} onDelete={remove} />
      )}
    </div>
  );
}
