import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStaffAssignments } from '@/hooks/use-staff_assignments';
import { StaffAssignmentForm } from '@/components/staff_assignment-form';
import { StaffAssignmentList } from '@/components/staff_assignment-list';
import type { CreateStaffAssignmentInput } from '@/types/staff_assignment';

export default function StaffAssignmentsPage() {
  const { items, loading, create, remove } = useStaffAssignments();
  const [showForm, setShowForm] = useState(false);

  const handleCreate = async (data: CreateStaffAssignmentInput) => {
    await create(data);
    setShowForm(false);
  };

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">StaffAssignments</h1>
        <Button onClick={() => setShowForm(!showForm)}><Plus className="h-4 w-4 mr-2" />Add StaffAssignment</Button>
      </div>
      {showForm && (
        <div className="mb-8 p-6 border rounded-[var(--radius)]">
          <h2 className="text-lg font-semibold mb-4">New StaffAssignment</h2>
          <StaffAssignmentForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
        </div>
      )}
      {loading ? (
        <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[hsl(var(--primary))]" /></div>
      ) : (
        <StaffAssignmentList items={items} onDelete={remove} />
      )}
    </div>
  );
}
